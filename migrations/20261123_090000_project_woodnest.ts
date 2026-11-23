// Portfolio project: Woodnest (Scandinavian furniture store), shown first in Work and in the hero slider.
// Skipped if a project with this URL already exists (e.g. added by hand in the CMS).
import fs from 'fs'
import path from 'path'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

const context = { disableRevalidate: true }

const project = {
  client: 'Woodnest',
  url: 'https://woodnest.id',
  tags: ['Next.js', 'Payload CMS', 'Bilingual'],
  sortOrder: 0,
  showInHero: true,
  title: 'Woodnest — Furnitur Skandinavia',
  titleEn: 'Woodnest — Scandinavian Furniture',
  category: 'E-Commerce',
  categoryEn: 'E-Commerce',
  description:
    'Toko online furnitur kayu solid buatan pengrajin lokal: katalog koleksi lengkap, keranjang belanja, pesanan custom, dan dua bahasa (ID/EN).',
  descriptionEn:
    'Online store for solid-wood furniture made by local artisans: full collection catalogue, shopping cart, custom orders, and two languages (ID/EN).',
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.count({
    collection: 'projects',
    where: { url: { like: 'woodnest.id' } },
    req,
    overrideAccess: true,
  })
  if (existing.totalDocs > 0) return

  const filePath = path.resolve(process.cwd(), 'public/images/projects/woodnest/image.webp')
  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`Project image not found: ${filePath}, Woodnest skipped.`)
    return
  }
  const media = await payload.create({ collection: 'media', data: { alt: project.client }, filePath, req, context, overrideAccess: true })
  await payload.create({ collection: 'projects', data: { ...project, image: media.id }, req, context, overrideAccess: true })
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // The project is left in place.
}
