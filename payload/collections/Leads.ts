import type { CollectionConfig } from 'payload'

import { isStaff } from '../access'
import { notifyNewLead } from '../hooks/notifyLead'

/**
 * Project briefs sent from the website form (/mulai-proyek). Created by a server action
 * (overrideAccess), so the public cannot read or write this collection through the API.
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Brief', plural: 'Brief Proyek' },
  defaultSort: '-createdAt',
  admin: {
    group: 'Masuk',
    useAsTitle: 'name',
    defaultColumns: ['name', 'business', 'service', 'whatsapp', 'handled', 'createdAt'],
    description: 'Brief yang dikirim calon klien lewat form di website. Centang "Sudah ditindaklanjuti" setelah dihubungi.',
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
    { name: 'handled', label: 'Sudah ditindaklanjuti', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'sourcePage', label: 'Dikirim dari halaman', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'lang', label: 'Bahasa', type: 'text', admin: { position: 'sidebar', readOnly: true } },
  ],
}
