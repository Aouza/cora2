CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"full_name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "relatorios" DROP CONSTRAINT "relatorios_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "relatos" DROP CONSTRAINT "relatos_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "relatorios" ADD CONSTRAINT "relatorios_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relatos" ADD CONSTRAINT "relatos_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;