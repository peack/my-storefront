import type { AccessArgs } from 'payload'
import { checkRole } from './collections/Users/checkRole'
import { Access } from 'payload'
import { User } from '@/payload-types'

type isAdmin = (args: AccessArgs<unknown | User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  return user !== null ? checkRole(['admin'], user) : false
}

export const anyone: Access = () => true
