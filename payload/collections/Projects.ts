import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { bilingual, slugField, sortOrderField } from '../fields'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Portfolio' },
  defaultSort: 'sortOrder',
  admin: {
    group: 'Konten',
    useAsTitle: 'client',
    defaultColumns: ['client', 'url', 'showInHero', 'hidden', 'sortOrder'],
    description:
      'Website di section Karya. Centang "Tampilkan di Hero" untuk showcase paling atas. Isi bagian Studi Kasus agar halaman detail project (/karya/slug) lebih lengkap.',
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
    {
      type: 'collapsible',
      label: 'Studi kasus (halaman detail project)',
      admin: {
        initCollapsed: false,
        description: 'Opsional. Bagian yang kosong tidak ditampilkan. Tulis hanya fakta yang disetujui klien.',
      },
      fields: [
        ...bilingual({ name: 'challenge', label: 'Tantangan klien', type: 'textarea', admin: { description: 'Masalah atau kebutuhan klien sebelum project.' } }),
        ...bilingual({ name: 'solution', label: 'Solusi kami', type: 'textarea', admin: { description: 'Apa yang kami bangun dan kenapa.' } }),
        ...bilingual({ name: 'result', label: 'Hasil', type: 'textarea', admin: { description: 'Dampak setelah website live (angka nyata bila ada).' } }),
      ],
    },
    slugField('client'),
    sortOrderField,
    { name: 'showInHero', label: 'Tampilkan di Hero', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'hidden',
      label: 'Sembunyikan dari website',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Misalnya saat website klien sedang tidak bisa dibuka. Data tetap tersimpan.' },
    },
  ],
}
