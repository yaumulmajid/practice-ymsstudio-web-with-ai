import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { bilingual, sortOrderField } from '../fields'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: { singular: 'Review', plural: 'Review Klien' },
  defaultSort: 'sortOrder',
  admin: {
    group: 'Konten',
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'sortOrder'],
    description: 'Hanya review asli dengan izin klien. Section Review muncul otomatis bila ada minimal satu review.',
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Nama klien', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'rating', label: 'Rating (1–5)', type: 'number', min: 1, max: 5, defaultValue: 5, required: true, admin: { width: '50%' } },
      ],
    },
    ...bilingual({ name: 'role', label: 'Jabatan / bisnis', type: 'text', required: true, admin: { description: 'mis. Owner, Sarasa Catering' } }),
    ...bilingual({ name: 'quote', label: 'Isi review', type: 'textarea', required: true }),
    { name: 'project', label: 'Website klien (opsional)', type: 'text', admin: { placeholder: 'https://' } },
    { ...sortOrderField, admin: { position: 'sidebar', description: 'Urutan terkecil tampil sebagai kartu besar.' } },
  ],
}
