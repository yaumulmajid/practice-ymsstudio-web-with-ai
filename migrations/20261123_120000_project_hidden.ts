import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Projects: "Sembunyikan dari website" checkbox. Hides Haris Jaya for now:
// harisjayaservice.com no longer resolves, so it should not be linked from the portfolio.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "hidden" boolean DEFAULT false;
  UPDATE "projects" SET "hidden" = true WHERE "url" LIKE '%harisjayaservice.com%';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP COLUMN "hidden";`)
}
