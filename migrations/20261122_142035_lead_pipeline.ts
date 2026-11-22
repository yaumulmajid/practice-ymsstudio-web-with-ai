import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Leads: status pipeline (replaces the "handled" checkbox), calculator answers,
// internal notes, and visit attribution (UTM / referrer / landing page).
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'proposal', 'won', 'lost');
  ALTER TABLE "leads" ADD COLUMN "estimate" varchar;
  ALTER TABLE "leads" ADD COLUMN "notes" varchar;
  ALTER TABLE "leads" ADD COLUMN "status" "enum_leads_status" DEFAULT 'new' NOT NULL;
  ALTER TABLE "leads" ADD COLUMN "utm_source" varchar;
  ALTER TABLE "leads" ADD COLUMN "utm_medium" varchar;
  ALTER TABLE "leads" ADD COLUMN "utm_campaign" varchar;
  ALTER TABLE "leads" ADD COLUMN "referrer" varchar;
  ALTER TABLE "leads" ADD COLUMN "landing_page" varchar;
  CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");
  CREATE INDEX "leads_utm_source_idx" ON "leads" USING btree ("utm_source");
  UPDATE "leads" SET "status" = 'contacted' WHERE "handled" = true;
  ALTER TABLE "leads" DROP COLUMN "handled";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leads" ADD COLUMN "handled" boolean DEFAULT false;
  UPDATE "leads" SET "handled" = true WHERE "status" <> 'new';
  DROP INDEX "leads_status_idx";
  DROP INDEX "leads_utm_source_idx";
  ALTER TABLE "leads" DROP COLUMN "estimate";
  ALTER TABLE "leads" DROP COLUMN "notes";
  ALTER TABLE "leads" DROP COLUMN "status";
  ALTER TABLE "leads" DROP COLUMN "utm_source";
  ALTER TABLE "leads" DROP COLUMN "utm_medium";
  ALTER TABLE "leads" DROP COLUMN "utm_campaign";
  ALTER TABLE "leads" DROP COLUMN "referrer";
  ALTER TABLE "leads" DROP COLUMN "landing_page";
  DROP TYPE "public"."enum_leads_status";`)
}
