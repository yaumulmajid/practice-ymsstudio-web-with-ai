// Named before the seed migrations (like maps_url) so a fresh database has the new
// columns before content is written.
// Case-study fields + slug for projects (detail pages at /karya/<slug>) and the "leads"
// collection for project briefs sent from the website form.
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { slugify } from '../payload/fields'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"business" varchar,
  	"whatsapp" varchar NOT NULL,
  	"email" varchar,
  	"service" varchar,
  	"budget" varchar,
  	"timeline" varchar,
  	"message" varchar,
  	"handled" boolean DEFAULT false,
  	"source_page" varchar,
  	"lang" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "projects" ADD COLUMN "challenge" varchar;
  ALTER TABLE "projects" ADD COLUMN "challenge_en" varchar;
  ALTER TABLE "projects" ADD COLUMN "solution" varchar;
  ALTER TABLE "projects" ADD COLUMN "solution_en" varchar;
  ALTER TABLE "projects" ADD COLUMN "result" varchar;
  ALTER TABLE "projects" ADD COLUMN "result_en" varchar;
  ALTER TABLE "projects" ADD COLUMN "slug" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "leads_id" integer;
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");`)

  // Give existing projects a URL slug from the client name (unique).
  const { rows } = await db.execute(sql`SELECT "id", "client" FROM "projects" ORDER BY "id"`)
  const used = new Set<string>()
  for (const row of rows as { id: number; client: string | null }[]) {
    const base = slugify(row.client || '') || `project-${row.id}`
    let slug = base
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`
    used.add(slug)
    await db.execute(sql`UPDATE "projects" SET "slug" = ${slug} WHERE "id" = ${row.id}`)
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "leads" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leads_fk";
  
  DROP INDEX "projects_slug_idx";
  DROP INDEX "payload_locked_documents_rels_leads_id_idx";
  ALTER TABLE "projects" DROP COLUMN "challenge";
  ALTER TABLE "projects" DROP COLUMN "challenge_en";
  ALTER TABLE "projects" DROP COLUMN "solution";
  ALTER TABLE "projects" DROP COLUMN "solution_en";
  ALTER TABLE "projects" DROP COLUMN "result";
  ALTER TABLE "projects" DROP COLUMN "result_en";
  ALTER TABLE "projects" DROP COLUMN "slug";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "leads_id";`)
}
