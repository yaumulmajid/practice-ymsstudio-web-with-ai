// Blog post: "PHP2Shell (CVE-2026-109618 & 109619): Apakah Website Bisnis Anda Aman?" (ID + EN) with its cover image.
// Skipped if a post with this slug already exists (e.g. edited or recreated in the CMS).
import fs from 'fs'
import path from 'path'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import post from './seed/post-php2shell.json'

const context = { disableRevalidate: true }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.count({
    collection: 'posts',
    where: { slug: { equals: post.slug } },
    req,
    overrideAccess: true,
  })
  if (existing.totalDocs > 0) return

  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const { markdown, markdownEn, coverAlt, ...data } = post

  let cover: number | undefined
  const filePath = path.resolve(process.cwd(), `public/images/blog/${post.slug}.webp`)
  if (fs.existsSync(filePath)) {
    const media = await payload.create({ collection: 'media', data: { alt: coverAlt }, filePath, req, context, overrideAccess: true })
    cover = media.id as number
  } else {
    payload.logger.warn(`Blog cover not found: ${filePath}`)
  }

  await payload.create({
    collection: 'posts',
    data: {
      ...data,
      status: 'published',
      cover,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Lexical JSON
      content: convertMarkdownToLexical({ editorConfig, markdown }) as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contentEn: convertMarkdownToLexical({ editorConfig, markdown: markdownEn }) as any,
    },
    req,
    context,
    overrideAccess: true,
  })
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // The post is left in place.
}
