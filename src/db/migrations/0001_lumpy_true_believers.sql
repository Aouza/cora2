ALTER TABLE "ecos" ALTER COLUMN "tipo" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."tipo_eco";--> statement-breakpoint
CREATE TYPE "public"."tipo_eco" AS ENUM('florescer', 'abraco', 'entendo');--> statement-breakpoint
ALTER TABLE "ecos" ALTER COLUMN "tipo" SET DATA TYPE "public"."tipo_eco" USING "tipo"::"public"."tipo_eco";