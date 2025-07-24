ALTER TABLE "profiles" ADD COLUMN "nickname" varchar(50);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "custom_avatar_url" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "use_custom_avatar" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "profile_completed" boolean DEFAULT false;