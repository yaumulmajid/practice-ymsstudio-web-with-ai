import type { Field, GlobalConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { headingFields, t, ta, textList } from '../fields'
import { revalidateGlobal } from '../hooks/revalidate'

const itemList = (name: string, label: string, itemLabel: string): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: itemLabel, plural: label },
  admin: { initCollapsed: true },
  fields: [...t('title', 'Judul'), ...ta('text', 'Deskripsi')],
})

/** Every section of the landing page (/ and /en), one tab per section. */
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Halaman Utama',
  admin: { group: 'Halaman', description: 'Teks setiap section di halaman utama, dalam Bahasa Indonesia dan Inggris.' },
  access: { read: anyone, update: isStaff },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            ...t('badge', 'Badge', "mis. 'Menerima proyek baru'"),
            ...t('kicker', 'Teks kecil di atas judul'),
            ...t('line1', 'Judul baris 1'),
            ...t('line2', 'Judul baris 2'),
            textList('words', 'Kata berganti (animasi)', 'Kata'),
            ...ta('sub', 'Sub-judul'),
            ...t('ctaPrimary', 'Tombol utama'),
            ...t('ctaSecondary', 'Tombol kedua'),
            ...t('ctaSecondaryNote', 'Catatan tombol kedua', "mis. '· mulai Rp 2jt'"),
            ...t('guaranteeTitle', 'Kartu melayang 1 — judul'),
            ...t('guaranteeText', 'Kartu melayang 1 — teks'),
            ...t('ratingTitle', 'Kartu melayang 2 — judul'),
            ...t('ratingText', 'Kartu melayang 2 — teks'),
            textList('marquee', 'Teks berjalan'),
          ],
        },
        {
          name: 'work',
          label: 'Karya',
          description: 'Judul section portfolio. Daftar project diatur di menu Portfolio.',
          fields: [...headingFields(), ...t('titleB', 'Judul (lanjutan)'), ...ta('text', 'Deskripsi')],
        },
        {
          name: 'services',
          label: 'Layanan',
          fields: [
            ...headingFields(),
            ...ta('text', 'Deskripsi'),
            itemList('items', 'Daftar layanan', 'Layanan'),
            ...t('processLabel', 'Proses — label kecil'),
            ...t('processTitleA', 'Proses — judul'),
            ...t('processTitleEm', 'Proses — judul (miring)'),
            itemList('steps', 'Langkah proses', 'Langkah'),
          ],
        },
        {
          name: 'reviewsSection',
          label: 'Review',
          description: 'Judul section review. Isi review diatur di menu Review Klien.',
          fields: [...headingFields(), ...ta('text', 'Deskripsi')],
        },
        {
          name: 'pricing',
          label: 'Harga',
          fields: [
            ...headingFields(),
            ...ta('text', 'Deskripsi'),
            textList('included', 'Termasuk di semua paket', 'Fitur'),
            {
              name: 'tiers',
              label: 'Paket',
              type: 'array',
              labels: { singular: 'Paket', plural: 'Paket' },
              admin: { initCollapsed: true },
              fields: [
                ...t('name', 'Nama paket'),
                ...t('price', 'Harga', 'mis. 2jt / 3,5jt (ID) dan 2M / 3.5M (EN)'),
                {
                  name: 'priceUsd',
                  label: 'Harga USD (versi Inggris)',
                  type: 'text',
                  admin: {
                    description:
                      "Angka saja, mis. 149 → tampil 'US$149' sebagai harga utama di versi Inggris (harga Rupiah tetap tampil kecil untuk klien di Indonesia). Kosongkan untuk memakai perkiraan dari kurs.",
                  },
                },
                ...ta('tagline', 'Tagline'),
                ...t('timeline', 'Lama pengerjaan'),
                ...t('renewal', 'Biaya perpanjangan'),
                { name: 'featured', label: 'Paling populer (kartu gelap)', type: 'checkbox', defaultValue: false },
                textList('features', 'Fitur', 'Fitur'),
              ],
            },
            ...t('customTitle', 'Strip custom — judul'),
            ...ta('customText', 'Strip custom — teks'),
            ...t('customCta', 'Strip custom — tombol'),
          ],
        },
        {
          name: 'faq',
          label: 'FAQ',
          fields: [
            ...headingFields(),
            {
              name: 'items',
              label: 'Pertanyaan',
              type: 'array',
              labels: { singular: 'Pertanyaan', plural: 'Pertanyaan' },
              admin: { initCollapsed: true },
              fields: [...t('q', 'Pertanyaan'), ...ta('a', 'Jawaban')],
            },
          ],
        },
        {
          name: 'cta',
          label: 'Ajakan (CTA)',
          fields: [
            ...t('kicker', 'Label kecil'),
            ...t('line1', 'Judul baris 1'),
            ...t('line2A', 'Judul baris 2'),
            ...t('line2Em', 'Judul baris 2 (miring)'),
            ...ta('text', 'Deskripsi'),
            ...t('button', 'Tombol'),
          ],
        },
        {
          name: 'footer',
          label: 'Footer',
          fields: [...ta('about', 'Tentang YMS Studio'), textList('services', 'Daftar layanan', 'Layanan'), ...t('available', 'Status')],
        },
      ],
    },
  ],
}

