// Initial content: the site's existing copy, 6 portfolio projects and 3 blog posts.
// Runs once (like every migration) and skips anything that already has content.
import fs from 'fs'
import path from 'path'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import seed from './seed/content.json'

// No cache revalidation while migrating (the site is not serving yet).
const context = { disableRevalidate: true }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const projects = await payload.count({ collection: 'projects', req, overrideAccess: true })
  if (projects.totalDocs === 0) {
    for (const p of seed.projects) {
      const filePath = path.resolve(process.cwd(), p.imageFile)
      if (!fs.existsSync(filePath)) {
        payload.logger.warn(`Seed: image not found for ${p.client} (${filePath}), skipped.`)
        continue
      }
      const media = await payload.create({ collection: 'media', data: { alt: p.client }, filePath, req, context, overrideAccess: true })
      const { imageFile: _imageFile, ...data } = p
      await payload.create({ collection: 'projects', data: { ...data, image: media.id }, req, context, overrideAccess: true })
    }
  }

  const posts = await payload.count({ collection: 'posts', req, overrideAccess: true })
  if (posts.totalDocs === 0) {
    for (const post of seed.posts) {
      await payload.create({
        collection: 'posts',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Lexical JSON from the seed file
        data: post as any,
        req,
        context,
        overrideAccess: true,
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- seed shapes match the global schemas
  const home = (await payload.findGlobal({ slug: 'home-page', req, overrideAccess: true })) as any
  if (!home?.hero?.line1) {
    await payload.updateGlobal({ slug: 'home-page', data: seed.homePage, req, context, overrideAccess: true })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = (await payload.findGlobal({ slug: 'site-settings', req, overrideAccess: true })) as any
  if (!settings?.contact?.waNumber) {
    await payload.updateGlobal({ slug: 'site-settings', data: seed.siteSettings, req, context, overrideAccess: true })
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content is left in place.
}
