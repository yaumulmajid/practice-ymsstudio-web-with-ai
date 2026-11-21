import { APIError, type CollectionBeforeDeleteHook, type CollectionConfig } from 'payload'

import { adminOrSelf, isAdmin, isAdminField } from '../access'

const MIN_PASSWORD_LENGTH = 10

/** Never delete the last admin account (that would lock everyone out). */
const preventDeleteLastAdmin: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const user = await req.payload.findByID({ collection: 'users', id, overrideAccess: true, req })
  if ((user as { role?: string }).role !== 'admin') return
  const { totalDocs } = await req.payload.count({
    collection: 'users',
    where: { role: { equals: 'admin' } },
    overrideAccess: true,
    req,
  })
  if (totalDocs <= 1) throw new APIError('Tidak bisa menghapus admin terakhir.', 400, undefined, true)
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Pengguna', plural: 'Pengguna' },
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'name', 'role'], group: 'Pengaturan' },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
    tokenExpiration: 60 * 60 * 8, // 8 hours
    cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' },
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    read: adminOrSelf,
    create: isAdmin,
    update: adminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeDelete: [preventDeleteLastAdmin],
    beforeValidate: [
      ({ data }) => {
        const password = (data as { password?: unknown } | undefined)?.password
        if (typeof password === 'string' && password.length < MIN_PASSWORD_LENGTH) {
          throw new APIError(`Password minimal ${MIN_PASSWORD_LENGTH} karakter.`, 400, undefined, true)
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data, operation, req }) => {
        // The very first account is always an admin.
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
          if (totalDocs === 0) data.role = 'admin'
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', label: 'Nama', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { create: isAdminField, update: isAdminField },
      admin: { description: 'Admin: akses penuh termasuk pengguna. Editor: semua konten.' },
    },
  ],
}
