// Woodnest: replace the plain screenshot with the laptop + phone mockup used by the other projects.
// Skipped if the project is missing or already uses the mockup.
import fs from 'fs'
import path from 'path'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

const context = { disableRevalidate: true }
const ALT = 'Woodnest — mockup'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({
    collection: 'projects',
    where: { url: { like: 'woodnest.id' } },
    depth: 1,
    limit: 1,
    req,
    overrideAccess: true,
  })
  const project = docs[0]
  if (!project) return
  const old = typeof project.image === 'object' ? project.image : null
  if (old?.alt === ALT) return

  const filePath = path.resolve(process.cwd(), 'public/images/projects/woodnest/image.webp')
  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`Woodnest mockup not found: ${filePath}`)
    return
  }
  const media = await payload.create({ collection: 'media', data: { alt: ALT }, filePath, req, context, overrideAccess: true })
  await payload.update({ collection: 'projects', id: project.id, data: { image: media.id }, req, context, overrideAccess: true })
  if (old?.id) {
    await payload.delete({ collection: 'media', id: old.id, req, context, overrideAccess: true }).catch(() => undefined)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // The image is left in place.
}
