import type { CollectionConfig } from 'payload'

import { isStaff } from '../access'
import { notifyNewLead } from '../hooks/notifyLead'

export const LEAD_STATUSES = [
  { label: 'Baru', value: 'new' },
  { label: 'Sudah dihubungi', value: 'contacted' },
  { label: 'Penawaran dikirim', value: 'proposal' },
  { label: 'Deal', value: 'won' },
  { label: 'Batal / tidak lanjut', value: 'lost' },
]

/**
 * Project briefs sent from the website form (/kontak). Created by a server action
 * (overrideAccess), so the public cannot read or write this collection through the API.
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Brief', plural: 'Brief Proyek' },
  defaultSort: '-createdAt',
  admin: {
    group: 'Masuk',
    useAsTitle: 'name',
    defaultColumns: ['name', 'business', 'service', 'status', 'utmSource', 'createdAt'],
    listSearchableFields: ['name', 'business', 'whatsapp', 'email'],
    description:
      'Brief yang dikirim calon klien lewat form di website. Perbarui "Status" setiap kali ada perkembangan; filter daftar ini per status atau sumber.',
  },
  access: { read: isStaff, create: isStaff, update: isStaff, delete: isStaff },
  hooks: { afterChange: [notifyNewLead] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Nama', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'business', label: 'Nama bisnis', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'whatsapp', label: 'WhatsApp', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', label: 'Email', type: 'email', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'service', label: 'Layanan', type: 'text', admin: { width: '33%' } },
        { name: 'budget', label: 'Budget', type: 'text', admin: { width: '33%' } },
        { name: 'timeline', label: 'Target selesai', type: 'text', admin: { width: '33%' } },
      ],
    },
    { name: 'message', label: 'Cerita / kebutuhan', type: 'textarea' },
    {
      name: 'estimate',
      label: 'Jawaban kalkulator biaya',
      type: 'textarea',
      admin: { readOnly: true, description: 'Terisi otomatis bila calon klien datang dari kalkulator biaya.' },
    },
    { name: 'notes', label: 'Catatan internal', type: 'textarea', admin: { description: 'Hanya terlihat di CMS.' } },

    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: LEAD_STATUSES,
      index: true,
      admin: { position: 'sidebar' },
    },
    { name: 'utmSource', label: 'Sumber (utm_source)', type: 'text', index: true, admin: { position: 'sidebar', readOnly: true } },
    { name: 'utmMedium', label: 'Medium (utm_medium)', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'utmCampaign', label: 'Kampanye (utm_campaign)', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    {
      name: 'referrer',
      label: 'Datang dari situs',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true, description: 'Mis. google.com, instagram.com. Kosong = langsung / tidak diketahui.' },
    },
    { name: 'landingPage', label: 'Halaman pertama dibuka', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'sourcePage', label: 'Dikirim dari halaman', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'lang', label: 'Bahasa', type: 'text', admin: { position: 'sidebar', readOnly: true } },
  ],
}
