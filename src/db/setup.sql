-- Setup inicial do banco para seeds
-- Este arquivo reseta e prepara o banco para receber dados de seed

-- Limpar dados existentes (ordem importante por causa das foreign keys)
TRUNCATE TABLE ecos CASCADE;
TRUNCATE TABLE relatos CASCADE;
TRUNCATE TABLE relatorios CASCADE;
TRUNCATE TABLE profiles CASCADE;

-- Resetar sequências se existirem
-- (UUIDs não têm sequências, mas deixamos preparado)

-- Configurações específicas para seeds
SET session_replication_role = replica; -- Desabilita triggers temporariamente 