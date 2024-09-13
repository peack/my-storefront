import path from 'path'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Products } from '@collections/Products'
import { Media } from '@collections/Media'
import { Users } from '@collections/Users'
import { searchPlugin } from '@payloadcms/plugin-search'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  i18n: {
    supportedLanguages: { en, fr },
  },
  collections: [Users, Media, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: 'mike@mikega.xyz',
    defaultFromName: 'Mike',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  plugins: [
    seoPlugin({
      collections: ['products'],
      uploadsCollection: 'media',
    }),
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.READ_WRITE_TOKEN || '',
    }),
    searchPlugin({
      collections: ['products'],
      defaultPriorities: {
        products: 10,
      },
      searchOverrides: {
        slug: 'search',
        fields: ({ defaultFields }: { defaultFields: any[] }) => [
          ...defaultFields,
          {
            name: 'slug',
            type: 'text',
          },
          {
            name: 'imageUrl',
            type: 'text',
          },
        ],
      },
      beforeSync: ({ originalDoc, searchDoc }: { originalDoc: any; searchDoc: any }) => {
        const originalDocMedia = originalDoc?.meta?.image as any
        const docImage = (originalDocMedia.en?.url || originalDocMedia.fr?.url) as string
        return {
          ...searchDoc,
          slug: originalDoc.slug,
          imageUrl: docImage ?? null,
        }
      },
    }),
  ],
  sharp,
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
})
