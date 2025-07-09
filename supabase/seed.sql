-- Supabase Seed File
-- Este arquivo é usado para popular o banco de dados local do Supabase
-- Arquivo criado para resolver: WARN: no files matched pattern: supabase/seed.sql

-- Inserir alguns profiles de exemplo (tabela principal)
INSERT INTO profiles (
  id, 
  email, 
  full_name,
  avatar_url,
  created_at, 
  updated_at
) VALUES 
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'ana.silva@example.com',
    'Ana Silva',
    'https://example.com/avatar1.jpg',
    now(),
    now()
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002', 
    'maria.santos@example.com',
    'Maria Santos',
    'https://example.com/avatar2.jpg',
    now(),
    now()
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'carolina.oliveira@example.com', 
    'Carolina Oliveira',
    'https://example.com/avatar3.jpg',
    now(),
    now()
  )
ON CONFLICT (id) DO NOTHING;

-- Inserir alguns relatos de exemplo (usar 'texto' em vez de 'content')
INSERT INTO relatos (
  id,
  user_id,
  texto,
  created_at
) VALUES
  (
    '550e8400-e29b-41d4-a716-446655441001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Hoje foi um dia difícil. Sinto que estou crescendo, mas o processo dói.',
    now()
  ),
  (
    '550e8400-e29b-41d4-a716-446655441002',
    '550e8400-e29b-41d4-a716-446655440002', 
    'Acordei com uma sensação de esperança que não sentia há tempos.',
    now()
  ),
  (
    '550e8400-e29b-41d4-a716-446655441003',
    '550e8400-e29b-41d4-a716-446655440003',
    'As vezes me pergunto se estou no caminho certo, mas sinto que sim.',
    now()
  )
ON CONFLICT (id) DO NOTHING;

-- Inserir alguns ecos de exemplo  
INSERT INTO ecos (
  id,
  relato_id,
  tipo,
  created_at
) VALUES
  (
    '550e8400-e29b-41d4-a716-446655442001',
    '550e8400-e29b-41d4-a716-446655441001',
    '🌱',
    now()
  ),
  (
    '550e8400-e29b-41d4-a716-446655442002', 
    '550e8400-e29b-41d4-a716-446655441001',
    '🫂',
    now()
  ),
  (
    '550e8400-e29b-41d4-a716-446655442003',
    '550e8400-e29b-41d4-a716-446655441002', 
    '💧',
    now()
  )
ON CONFLICT (id) DO NOTHING;

-- Comentário informativo
-- Este arquivo seed.sql é executado automaticamente quando você roda:
-- supabase db reset
-- supabase start
-- 
-- Para seeds mais robustos, use os scripts do projeto:
-- yarn db:seed-simple
-- yarn db:seed 