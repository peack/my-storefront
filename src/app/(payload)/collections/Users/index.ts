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
    forgotPassword: {
      generateEmailSubject(args) {
        return `${args?.user?.name ?? args?.user?.email} - Reset Password`
      },
      generateEmailHTML(args) {
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset?token=${args?.token}`
        return `
                <!doctype html>
                <html>
                  <body>
                    <h1>Reset your password</h1>
                    <p>Hello, ${args?.user?.email}!</p>
                    <p>Click below to reset your password.</p>
                    <p>
                      <a href="${resetPasswordURL}">${resetPasswordURL}</a>
                    </p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                  </body>
                </html>
              `
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
