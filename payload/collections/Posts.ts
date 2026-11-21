import { sql } from '@payloadcms/db-postgres'
import type { CollectionConfig, PayloadHandler } from 'payload'

import { isStaff, publishedOrStaff } from '../access'
import { bilingual, slugField } from '../fields'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

type Drizzle = { drizzle: { execute: (query: unknown) => Promise<{ rows: { views: number }[] }> } }

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|lighthouse|headless/i
const SLUG = /^[a-z0-9-]{1,200}$/

/**
 * Read counter. POST /api/posts/:slug/view adds one read and returns the total;
 * GET /api/posts/:slug/views only returns it. A single atomic SQL update: safe for
 * concurrent readers and it does not trigger the revalidate hooks (no cache purge per view).
 */
const viewHandler =
  (increment: boolean): PayloadHandler =>
  async (req) => {
    const slug = req.routeParams?.slug
    if (typeof slug !== 'string' || !SLUG.test(slug)) return Response.json({ error: 'Invalid slug' }, { status: 400 })
    const isBot = BOT.test(req.headers.get('user-agent') ?? '')
    const db = req.payload.db as unknown as Drizzle
    const { rows } =
      increment && !isBot
        ? await db.drizzle.execute(
            sql`update posts set views = coalesce(views, 0) + 1 where slug = ${slug} and status = 'published' returning views::int as views`,
          )
        : await db.drizzle.execute(
            sql`select coalesce(views, 0)::int as views from posts where slug = ${slug} and status = 'published'`,
          )
    if (!rows[0]) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json({ views: Number(rows[0].views) }, { headers: { 'Cache-Control': 'no-store' } })
  }

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artikel', plural: 'Blog' },
  defaultSort: '-publishedAt',
  admin: {
    group: 'Konten',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'views', 'status'],
    description: 'Artikel di /blog. Versi Inggris (/en/blog) muncul bila Judul · EN dan Isi · EN diisi.',
  },
  access: { read: publishedOrStaff, create: isStaff, update: isStaff, delete: isStaff },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  endpoints: [
    { path: '/:slug/view', method: 'post', handler: viewHandler(true) },
    { path: '/:slug/views', method: 'get', handler: viewHandler(false) },
  ],
  fields: [
    ...bilingual({ name: 'title', label: 'Judul', type: 'text', required: true }),
    ...bilingual({
      name: 'excerpt',
      label: 'Ringkasan',
      type: 'textarea',
      required: true,
      admin: { description: '1–2 kalimat (±155 karakter). Tampil di daftar blog dan sebagai deskripsi di Google.' },
    }),
    ...bilingual({ name: 'category', label: 'Kategori', type: 'text', admin: { description: 'mis. Tips, Harga, SEO' } }),
    {
      name: 'cover',
      label: 'Gambar cover',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Rasio 16:9, minimal 1200×675 px. Dipakai juga sebagai gambar saat dibagikan dan di hasil Google.' },
    },
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
    {
      name: 'views',
      label: 'Jumlah dibaca',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', readOnly: true, description: 'Bertambah otomatis setiap artikel dibaca.' },
    },
  ],
}
