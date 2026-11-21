import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Named before the seed migrations so a fresh database has the column before content
// is written. Also fills the office location for the existing site.
const MAPS_URL = 'https://maps.app.goo.gl/hJBpPL7bShbzWWjY9'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "contact_maps_url" varchar;`)
  await db.execute(sql`
   UPDATE "site_settings" SET "contact_maps_url" = ${MAPS_URL} WHERE "contact_maps_url" IS NULL;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "contact_maps_url";`)
}
