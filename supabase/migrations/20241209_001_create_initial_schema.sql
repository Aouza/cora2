-- Migração inicial do Cora.Deep
-- Combina as migrações 0000 e 0001 do Drizzle

-- Criar tipos ENUM
CREATE TYPE "public"."tipo_eco" AS ENUM('🌱', '🫂', '💧');
CREATE TYPE "public"."tipo_relatorio" AS ENUM('basico', 'profundo', 'renascimento');

-- Criar tabela users (compatibilidade)
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

-- Criar tabela profiles (principal)
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"full_name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);

-- Criar tabela relatos
CREATE TABLE "relatos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"texto" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Criar tabela ecos
CREATE TABLE "ecos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"relato_id" uuid NOT NULL,
	"tipo" "tipo_eco" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Criar tabela relatorios
CREATE TABLE "relatorios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"conteudo" text NOT NULL,
	"tipo" "tipo_relatorio" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Adicionar foreign keys para profiles
ALTER TABLE "ecos" ADD CONSTRAINT "ecos_relato_id_relatos_id_fk" 
  FOREIGN KEY ("relato_id") REFERENCES "public"."relatos"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "relatorios" ADD CONSTRAINT "relatorios_user_id_profiles_id_fk" 
  FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "relatos" ADD CONSTRAINT "relatos_user_id_profiles_id_fk" 
  FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action; 