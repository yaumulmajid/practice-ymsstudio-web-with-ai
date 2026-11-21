// Payload CMS (same stack as the Woodnest site): admin at /admin, PostgreSQL storage.
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { id } from '@payloadcms/translations/languages/id'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './payload/collections/Media'
import { Posts } from './payload/collections/Posts'
import { Projects } from './payload/collections/Projects'
import { Reviews } from './payload/collections/Reviews'
import { Users } from './payload/collections/Users'
import { HomePage } from './payload/globals/HomePage'
import { SiteSettings } from './payload/globals/SiteSettings'
import { pickLanguageCollection, pickLanguageGlobal } from './payload/hooks/pickLanguage'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Public URL of the site (CORS/CSRF allow-list, absolute media URLs). Read at runtime.
const serverURL =
  process.env.SITE_URL || (process.env.NODE_ENV === 'production' ? 'https://ymsstudio.id' : 'http://localhost:3000')

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    theme: 'light',
    dateFormat: 'd MMM yyyy, HH:mm',
    meta: { titleSuffix: ' · YMS Studio CMS', icons: [{ rel: 'icon', type: 'image/x-icon', url: '/favicon.ico' }] },
    components: {
      graphics: { Logo: '/payload/components/admin#Logo', Icon: '/payload/components/admin#Icon' },
      beforeLogin: ['/payload/components/admin#BeforeLogin'],
      afterNavLinks: ['/payload/components/admin#ViewSiteLink'],
    },
  },
  // Text is bilingual per field (`title` + `titleEn`, side by side). The website reads
  // with `context: { lang }` and pickLanguage returns the right language.
  collections: [Projects, Reviews, Posts, Media, Users].map((c) => ({
    ...c,
    hooks: { ...c.hooks, afterRead: [...(c.hooks?.afterRead ?? []), pickLanguageCollection] },
  })),
  globals: [HomePage, SiteSettings].map((g) => ({
    ...g,
    hooks: { ...g.hooks, afterRead: [...(g.hooks?.afterRead ?? []), pickLanguageGlobal] },
  })),
  // Admin UI language (menus and buttons).
  i18n: { supportedLanguages: { id, en }, fallbackLanguage: 'id' },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: [serverURL],
  csrf: [serverURL],
  graphQL: { disable: true },
  upload: { limits: { fileSize: 8 * 1024 * 1024 } },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Pending migrations (schema + initial content) run on boot in production.
    prodMigrations: migrations,
  }),
  sharp,
  // First admin account from ADMIN_EMAIL / ADMIN_PASSWORD (written to the VPS .env by
  // the deploy workflow), so the public "create first user" screen is never exposed.
  onInit: async (payload) => {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD
    if (!email || !password) return
    const { totalDocs } = await payload.count({ collection: 'users', overrideAccess: true })
    if (totalDocs > 0) return
    await payload.create({
      collection: 'users',
      data: { email, password, name: 'Admin', role: 'admin' },
      overrideAccess: true,
    })
    payload.logger.info(`Created the first admin account (${email}).`)
  },
})
