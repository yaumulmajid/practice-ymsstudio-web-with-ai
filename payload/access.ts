import type { Access, FieldAccess, PayloadRequest } from 'payload'

type Role = 'admin' | 'editor'

const roleOf = (req: PayloadRequest): Role | undefined => (req.user as { role?: Role } | null | undefined)?.role

export const isAdmin: Access = ({ req }) => roleOf(req) === 'admin'
export const isAdminField: FieldAccess = ({ req }) => roleOf(req) === 'admin'

/** Any logged-in user (admin or editor). */
export const isStaff: Access = ({ req }) => Boolean(req.user)
export const anyone: Access = () => true

/** Admins can read everyone; editors only themselves. */
export const adminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (roleOf(req) === 'admin') return true
  return { id: { equals: req.user.id } }
}

/** Visitors see published documents only; logged-in users see drafts too. */
export const publishedOrStaff: Access = ({ req }) => (req.user ? true : { status: { equals: 'published' } })
