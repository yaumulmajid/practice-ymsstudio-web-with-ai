// Cover images for the first three blog posts (public/images/blog/<slug>.webp).
// Only fills posts that have no cover yet, so covers changed in the CMS are kept.
import fs from 'fs'
import path from 'path'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

const context = { disableRevalidate: true }

const COVERS: Record<string, string> = {
  'biaya-membuat-website-umkm': 'Ilustrasi rincian biaya website: domain, hosting, dan desain',
  'landing-page-company-profile-atau-toko-online': 'Perbandingan landing page, company profile, dan toko online',
  'cara-website-bisnis-muncul-di-google': 'Ilustrasi website bisnis di peringkat teratas hasil pencarian',
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const [slug, alt] of Object.entries(COVERS)) {
    const { docs } = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      depth: 0,
      limit: 1,
      req,
      overrideAccess: true,
    })
    const post = docs[0]
    if (!post || post.cover) continue
    const filePath = path.resolve(process.cwd(), `public/images/blog/${slug}.webp`)
    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`Blog cover not found: ${filePath}`)
      continue
    }
    const media = await payload.create({ collection: 'media', data: { alt }, filePath, req, context, overrideAccess: true })
    await payload.update({ collection: 'posts', id: post.id, data: { cover: media.id }, req, context, overrideAccess: true })
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Covers are left in place.
}
