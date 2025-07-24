-- Aplicar migrações pendentes manualmente

-- Migração 0002: tipo_eco (se não existir)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_eco') THEN
        CREATE TYPE "public"."tipo_eco" AS ENUM('🌱', '🫂', '💧');
    END IF;
END $$;

-- Migração 0004: profile_visibility (se não existir)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'profile_visibility') THEN
        CREATE TYPE "public"."profile_visibility" AS ENUM('public', 'anonymous', 'private');
    END IF;
END $$;

-- Adicionar coluna profile_visibility se não existir
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "profile_visibility" "profile_visibility" DEFAULT 'anonymous';

-- Migração 0005: remover profile_visibility (se existir)
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "profile_visibility";

-- Remover tipo se não estiver sendo usado
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'profile_visibility'
    ) THEN
        DROP TYPE IF EXISTS "public"."profile_visibility";
    END IF;
END $$; 