import { CollectionConfig, PayloadRequest } from 'payload'
import { admins, anyone } from '../../access'
import adminsAndUser from '../../types/adminsAndUsers'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { User } from '@/payload-types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ req, token, user }) => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}`
        if (req.locale === 'fr') {
          return `Bonjour ${user.email}, veuillez cliquer sur ce lien pour valider votre compte: ${url}`
        } else {
          return `Hey ${user.email}, verify your email by clicking here: ${url}`
        }
      },
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req }: { req: PayloadRequest }) => {
      const user = req.user as User | null
      return checkRole(['admin'], user as User)
    },
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: 'favorites',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
}
