import type { AccessArgs } from 'payload/config'
import { checkRole } from './collections/Users/checkRole'
import { User } from 'payload-types'
import { Access } from 'payload'

type isAdmin = (args: AccessArgs<unknown, User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}

export const anyone: Access = () => true
