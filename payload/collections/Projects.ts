import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { bilingual, sortOrderField } from '../fields'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Portfolio' },
  defaultSort: 'sortOrder',
  admin: {
    group: 'Konten',
    useAsTitle: 'client',
    defaultColumns: ['client', 'url', 'showInHero', 'sortOrder'],
    description: 'Website di section Karya. Centang "Tampilkan di Hero" untuk showcase paling atas.',
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'client', label: 'Nama klien', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'url', label: 'URL website live', type: 'text', required: true, admin: { width: '50%', placeholder: 'https://' } },
      ],
    },
    {
      name: 'image',
      label: 'Screenshot',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Rasio ±16:10, lebar minimal 1600px.' },
    },
    ...bilingual({ name: 'title', label: 'Judul project', type: 'text', required: true }),
    ...bilingual({ name: 'category', label: 'Kategori', type: 'text', required: true }),
    ...bilingual({ name: 'description', label: 'Deskripsi singkat', type: 'textarea', required: true }),
    { name: 'tags', label: 'Teknologi / tag', type: 'text', hasMany: true },
    sortOrderField,
    { name: 'showInHero', label: 'Tampilkan di Hero', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
