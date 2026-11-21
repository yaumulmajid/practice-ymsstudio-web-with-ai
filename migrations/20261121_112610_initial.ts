import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"title_en" varchar,
  	"category" varchar NOT NULL,
  	"category_en" varchar,
  	"description" varchar NOT NULL,
  	"description_en" varchar,
  	"sort_order" numeric DEFAULT 10,
  	"show_in_hero" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"role" varchar NOT NULL,
  	"role_en" varchar,
  	"quote" varchar NOT NULL,
  	"quote_en" varchar,
  	"project" varchar,
  	"sort_order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"title_en" varchar,
  	"excerpt" varchar NOT NULL,
  	"excerpt_en" varchar,
  	"category" varchar,
  	"category_en" varchar,
  	"cover_id" integer,
  	"content" jsonb NOT NULL,
  	"content_en" jsonb,
  	"slug" varchar,
  	"status" "enum_posts_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_detail_url" varchar,
  	"sizes_detail_width" numeric,
  	"sizes_detail_height" numeric,
  	"sizes_detail_mime_type" varchar,
  	"sizes_detail_filesize" numeric,
  	"sizes_detail_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"reviews_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_hero_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"text_en" varchar
  );
  
  CREATE TABLE "home_page_hero_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"text_en" varchar
  );
  
  CREATE TABLE "home_page_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"title_en" varchar,
  	"text" varchar,
  	"text_en" varchar
  );
  
  CREATE TABLE "home_page_services_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"title_en" varchar,
  	"text" varchar,
  	"text_en" varchar
  );
  
  CREATE TABLE "home_page_pricing_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"text_en" varchar
  );
  
  CREATE TABLE "home_page_pricing_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"text_en" varchar
  );
  
  CREATE TABLE "home_page_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"name_en" varchar,
  	"price" varchar,
  	"price_en" varchar,
  	"tagline" varchar,
  	"tagline_en" varchar,
  	"timeline" varchar,
  	"timeline_en" varchar,
  	"renewal" varchar,
  	"renewal_en" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "home_page_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"q_en" varchar,
  	"a" varchar,
  	"a_en" varchar
  );
  
  CREATE TABLE "home_page_footer_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"text_en" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar,
  	"hero_badge_en" varchar,
  	"hero_kicker" varchar,
  	"hero_kicker_en" varchar,
  	"hero_line1" varchar,
  	"hero_line1_en" varchar,
  	"hero_line2" varchar,
  	"hero_line2_en" varchar,
  	"hero_sub" varchar,
  	"hero_sub_en" varchar,
  	"hero_cta_primary" varchar,
  	"hero_cta_primary_en" varchar,
  	"hero_cta_secondary" varchar,
  	"hero_cta_secondary_en" varchar,
  	"hero_cta_secondary_note" varchar,
  	"hero_cta_secondary_note_en" varchar,
  	"hero_guarantee_title" varchar,
  	"hero_guarantee_title_en" varchar,
  	"hero_guarantee_text" varchar,
  	"hero_guarantee_text_en" varchar,
  	"hero_rating_title" varchar,
  	"hero_rating_title_en" varchar,
  	"hero_rating_text" varchar,
  	"hero_rating_text_en" varchar,
  	"work_label" varchar,
  	"work_label_en" varchar,
  	"work_title_a" varchar,
  	"work_title_a_en" varchar,
  	"work_title_em" varchar,
  	"work_title_em_en" varchar,
  	"work_title_b" varchar,
  	"work_title_b_en" varchar,
  	"work_text" varchar,
  	"work_text_en" varchar,
  	"services_label" varchar,
  	"services_label_en" varchar,
  	"services_title_a" varchar,
  	"services_title_a_en" varchar,
  	"services_title_em" varchar,
  	"services_title_em_en" varchar,
  	"services_text" varchar,
  	"services_text_en" varchar,
  	"services_process_label" varchar,
  	"services_process_label_en" varchar,
  	"services_process_title_a" varchar,
  	"services_process_title_a_en" varchar,
  	"services_process_title_em" varchar,
  	"services_process_title_em_en" varchar,
  	"reviews_section_label" varchar,
  	"reviews_section_label_en" varchar,
  	"reviews_section_title_a" varchar,
  	"reviews_section_title_a_en" varchar,
  	"reviews_section_title_em" varchar,
  	"reviews_section_title_em_en" varchar,
  	"reviews_section_text" varchar,
  	"reviews_section_text_en" varchar,
  	"pricing_label" varchar,
  	"pricing_label_en" varchar,
  	"pricing_title_a" varchar,
  	"pricing_title_a_en" varchar,
  	"pricing_title_em" varchar,
  	"pricing_title_em_en" varchar,
  	"pricing_text" varchar,
  	"pricing_text_en" varchar,
  	"pricing_custom_title" varchar,
  	"pricing_custom_title_en" varchar,
  	"pricing_custom_text" varchar,
  	"pricing_custom_text_en" varchar,
  	"pricing_custom_cta" varchar,
  	"pricing_custom_cta_en" varchar,
  	"faq_label" varchar,
  	"faq_label_en" varchar,
  	"faq_title_a" varchar,
  	"faq_title_a_en" varchar,
  	"faq_title_em" varchar,
  	"faq_title_em_en" varchar,
  	"cta_kicker" varchar,
  	"cta_kicker_en" varchar,
  	"cta_line1" varchar,
  	"cta_line1_en" varchar,
  	"cta_line2a" varchar,
  	"cta_line2_a_en" varchar,
  	"cta_line2_em" varchar,
  	"cta_line2_em_en" varchar,
  	"cta_text" varchar,
  	"cta_text_en" varchar,
  	"cta_button" varchar,
  	"cta_button_en" varchar,
  	"footer_about" varchar,
  	"footer_about_en" varchar,
  	"footer_available" varchar,
  	"footer_available_en" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_wa_number" varchar NOT NULL,
  	"contact_phone_display" varchar,
  	"contact_email" varchar,
  	"contact_instagram" varchar,
  	"contact_facebook" varchar,
  	"whatsapp_general" varchar,
  	"whatsapp_general_en" varchar,
  	"whatsapp_hero" varchar,
  	"whatsapp_hero_en" varchar,
  	"whatsapp_float" varchar,
  	"whatsapp_float_en" varchar,
  	"whatsapp_custom" varchar,
  	"whatsapp_custom_en" varchar,
  	"whatsapp_cta" varchar,
  	"whatsapp_cta_en" varchar,
  	"whatsapp_tier" varchar,
  	"whatsapp_tier_en" varchar,
  	"seo_title" varchar,
  	"seo_title_en" varchar,
  	"seo_description" varchar,
  	"seo_description_en" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_texts" ADD CONSTRAINT "projects_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_words" ADD CONSTRAINT "home_page_hero_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_marquee" ADD CONSTRAINT "home_page_hero_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_services_items" ADD CONSTRAINT "home_page_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_services_steps" ADD CONSTRAINT "home_page_services_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_pricing_included" ADD CONSTRAINT "home_page_pricing_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_pricing_tiers_features" ADD CONSTRAINT "home_page_pricing_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_pricing_tiers" ADD CONSTRAINT "home_page_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_faq_items" ADD CONSTRAINT "home_page_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_services" ADD CONSTRAINT "home_page_footer_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_image_idx" ON "projects" USING btree ("image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_texts_order_parent" ON "projects_texts" USING btree ("order","parent_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "posts_cover_idx" ON "posts" USING btree ("cover_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_detail_sizes_detail_filename_idx" ON "media" USING btree ("sizes_detail_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_words_order_idx" ON "home_page_hero_words" USING btree ("_order");
  CREATE INDEX "home_page_hero_words_parent_id_idx" ON "home_page_hero_words" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_marquee_order_idx" ON "home_page_hero_marquee" USING btree ("_order");
  CREATE INDEX "home_page_hero_marquee_parent_id_idx" ON "home_page_hero_marquee" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_items_order_idx" ON "home_page_services_items" USING btree ("_order");
  CREATE INDEX "home_page_services_items_parent_id_idx" ON "home_page_services_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_steps_order_idx" ON "home_page_services_steps" USING btree ("_order");
  CREATE INDEX "home_page_services_steps_parent_id_idx" ON "home_page_services_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_pricing_included_order_idx" ON "home_page_pricing_included" USING btree ("_order");
  CREATE INDEX "home_page_pricing_included_parent_id_idx" ON "home_page_pricing_included" USING btree ("_parent_id");
  CREATE INDEX "home_page_pricing_tiers_features_order_idx" ON "home_page_pricing_tiers_features" USING btree ("_order");
  CREATE INDEX "home_page_pricing_tiers_features_parent_id_idx" ON "home_page_pricing_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_pricing_tiers_order_idx" ON "home_page_pricing_tiers" USING btree ("_order");
  CREATE INDEX "home_page_pricing_tiers_parent_id_idx" ON "home_page_pricing_tiers" USING btree ("_parent_id");
  CREATE INDEX "home_page_faq_items_order_idx" ON "home_page_faq_items" USING btree ("_order");
  CREATE INDEX "home_page_faq_items_parent_id_idx" ON "home_page_faq_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_footer_services_order_idx" ON "home_page_footer_services" USING btree ("_order");
  CREATE INDEX "home_page_footer_services_parent_id_idx" ON "home_page_footer_services" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_texts" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_hero_words" CASCADE;
  DROP TABLE "home_page_hero_marquee" CASCADE;
  DROP TABLE "home_page_services_items" CASCADE;
  DROP TABLE "home_page_services_steps" CASCADE;
  DROP TABLE "home_page_pricing_included" CASCADE;
  DROP TABLE "home_page_pricing_tiers_features" CASCADE;
  DROP TABLE "home_page_pricing_tiers" CASCADE;
  DROP TABLE "home_page_faq_items" CASCADE;
  DROP TABLE "home_page_footer_services" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_users_role";`)
}
