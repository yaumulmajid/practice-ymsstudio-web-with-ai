import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Pricing tiers: a fixed US-dollar price for the English site (shown as the main price there,
// with the rupiah price kept for clients in Indonesia). Starting values; edit them in the CMS.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_pricing_tiers" ADD COLUMN "price_usd" varchar;
  UPDATE "home_page_pricing_tiers" SET "price_usd" = '149' WHERE "price" = '2jt';
  UPDATE "home_page_pricing_tiers" SET "price_usd" = '249' WHERE "price" = '3,5jt';
  UPDATE "home_page_pricing_tiers" SET "price_usd" = '399' WHERE "price" = '6jt';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_pricing_tiers" DROP COLUMN "price_usd";`)
}
