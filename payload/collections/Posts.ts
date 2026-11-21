import type { CollectionConfig } from 'payload'

import { isStaff, publishedOrStaff } from '../access'
import { bilingual, slugField } from '../fields'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artikel', plural: 'Blog' },
  defaultSort: '-publishedAt',
  admin: {
    group: 'Konten',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
    description: 'Artikel di /blog. Versi Inggris (/en/blog) muncul bila Judul · EN dan Isi · EN diisi.',
  },
  access: { read: publishedOrStaff, create: isStaff, update: isStaff, delete: isStaff },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    ...bilingual({ name: 'title', label: 'Judul', type: 'text', required: true }),
    ...bilingual({
      name: 'excerpt',
      label: 'Ringkasan',
      type: 'textarea',
      required: true,
      admin: { description: '1–2 kalimat. Tampil di daftar blog dan hasil Google.' },
    }),
    ...bilingual({ name: 'category', label: 'Kategori', type: 'text', admin: { description: 'mis. Tips, Harga, SEO' } }),
    { name: 'cover', label: 'Gambar cover (opsional)', type: 'upload', relationTo: 'media' },
    ...bilingual({ name: 'content', label: 'Isi artikel', type: 'richText', required: true }),
    slugField('title'),
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Terbit', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      label: 'Tanggal terbit',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
    },
  ],
}
