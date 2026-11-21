import type { GlobalConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { t, ta } from '../fields'
import { revalidateGlobal } from '../hooks/revalidate'

/** Contact details, WhatsApp messages and SEO shared by every page. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  admin: { group: 'Pengaturan' },
  access: { read: anyone, update: isStaff },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'contact',
          label: 'Kontak & Sosial Media',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'waNumber',
                  label: 'Nomor WhatsApp',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', description: 'Format internasional tanpa + atau spasi, mis. 6283822640883' },
                },
                { name: 'phoneDisplay', label: 'Nomor tampil', type: 'text', admin: { width: '50%', placeholder: '+62 838-2264-0883' } },
              ],
            },
            { name: 'email', label: 'Email', type: 'email' },
            {
              type: 'row',
              fields: [
                { name: 'instagram', label: 'Instagram URL', type: 'text', admin: { width: '50%' } },
                { name: 'facebook', label: 'Facebook URL', type: 'text', admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          name: 'whatsapp',
          label: 'Pesan WhatsApp',
          description: 'Pesan otomatis saat pengunjung klik tombol WhatsApp.',
          fields: [
            ...ta('general', "Tombol 'Mulai Proyek' (header)"),
            ...ta('hero', 'Tombol hero'),
            ...ta('float', 'Tombol WhatsApp melayang'),
            ...ta('custom', 'Strip web app custom'),
            ...ta('cta', 'Section CTA'),
            ...ta('tier', 'Tombol paket harga', 'Gunakan {paket} dan {harga}, mis. "Saya tertarik paket {paket} (mulai Rp {harga})"'),
          ],
        },
        {
          name: 'seo',
          label: 'SEO (Google)',
          fields: [
            ...t('title', 'Judul halaman', 'Tampil di tab browser & hasil Google (±60 karakter)'),
            ...ta('description', 'Deskripsi', 'Tampil di hasil Google (±155 karakter)'),
          ],
        },
      ],
    },
  ],
}
