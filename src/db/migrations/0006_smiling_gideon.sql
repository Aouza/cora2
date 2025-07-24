ALTER TABLE "profiles" ADD COLUMN "is_first_login" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "login_count" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "first_login_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "last_login_at" timestamp DEFAULT now();