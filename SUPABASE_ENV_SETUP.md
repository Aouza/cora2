# Configuração do Supabase - Variáveis de Ambiente

## Variáveis Necessárias

Para configurar a autenticação com Supabase e Drizzle ORM, adicione as seguintes variáveis no seu arquivo `.env.local`:

```env
# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Drizzle ORM - Database Connection
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

## Como Obter as Variáveis

1. **Acesse o [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Crie um novo projeto** ou selecione um existente
3. **Vá em Settings > API**
4. **Copie as variáveis:**
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Para o DATABASE_URL:**
   - Vá em Settings > Database
   - Na seção "Connection string", copie a URI
   - Substitua `[PASSWORD]` pela senha do seu projeto

## Setup do Drizzle ORM

### 1. Comandos para Migrations

```bash
# Gerar migrations baseadas no schema
yarn drizzle-kit generate

# Aplicar migrations (com Supabase CLI)
yarn drizzle-kit migrate

# Visualizar banco via Drizzle Studio
yarn drizzle-kit studio
```

### 2. Aplicar Migrations Diretamente no Supabase

**Opção 1: Via Supabase Dashboard**

1. Vá no SQL Editor do Supabase
2. Cole o conteúdo do arquivo `drizzle/[migration].sql`
3. Execute o SQL

**Opção 2: Via arquivo SQL gerado**

```sql
-- Cole o conteúdo de drizzle/0000_*.sql no Supabase SQL Editor
CREATE TYPE "public"."tipo_eco" AS ENUM('🌱', '🫂', '💧');
CREATE TYPE "public"."tipo_relatorio" AS ENUM('basico', 'profundo', 'renascimento');
-- ... resto das tabelas
```

## Configuração da Autenticação Social

No Supabase Dashboard:

### 1. Configurar Google OAuth

1. Vá em **Authentication > Providers**
2. **Habilite Google**
3. Configure as credenciais do Google Console:
   - Client ID
   - Client Secret
4. **Adicione URLs de redirecionamento:**
   - `http://localhost:3000/auth/callback` (desenvolvimento)
   - `https://seudominio.com/auth/callback` (produção)

### 2. Configurar Facebook OAuth

1. Vá em **Authentication > Providers**
2. **Habilite Facebook**
3. Configure as credenciais do Facebook Developers:
   - App ID
   - App Secret
4. **Adicione URLs de redirecionamento:**
   - `http://localhost:3000/auth/callback` (desenvolvimento)
   - `https://seudominio.com/auth/callback` (produção)

## Estrutura do Banco - Drizzle Schema

### Tabelas Implementadas:

#### 1. **users**

```typescript
{
  id: uuid (Primary Key)
  email: varchar(255) (Unique)
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 2. **relatos**

```typescript
{
  id: uuid (Primary Key)
  texto: text
  userId: uuid (FK → users.id)
  createdAt: timestamp
}
```

#### 3. **ecos** (Reações Simbólicas)

```typescript
{
  id: uuid (Primary Key)
  relatoId: uuid (FK → relatos.id)
  tipo: enum('🌱', '🫂', '💧')
  createdAt: timestamp
}
```

#### 4. **relatorios**

```typescript
{
  id: uuid (Primary Key)
  userId: uuid (FK → users.id)
  conteudo: text
  tipo: enum('basico', 'profundo', 'renascimento')
  createdAt: timestamp
}
```

## URLs de Configuração

### Site URL e Redirect URLs

No Supabase Dashboard > Authentication > URL Configuration:

- **Site URL**: `http://localhost:3000` (desenvolvimento) / `https://seudominio.com` (produção)
- **Redirect URLs**:
  - `http://localhost:3000/auth/callback`
  - `https://seudominio.com/auth/callback`

## Testando o Setup

### 1. Testar Drizzle ORM

```bash
# Executar exemplos de uso
yarn tsx db/queries.ts

# Ou criar um script de teste
node -e "
import { exemploDeUso } from './db/queries.js';
exemploDeUso();
"
```

### 2. Testar Autenticação

1. Execute o projeto: `yarn dev`
2. Acesse `/login`
3. Teste o login com Google/Facebook
4. Verifique se é redirecionado para `/dashboard`
5. Teste o logout

## Comandos Úteis

```bash
# Instalar dependências
yarn add drizzle-orm drizzle-kit postgres @types/pg

# Scripts úteis no package.json
"db:generate": "drizzle-kit generate",
"db:migrate": "drizzle-kit migrate",
"db:studio": "drizzle-kit studio",
"db:push": "drizzle-kit push"
```

## Troubleshooting

### Erro de CORS

- Verifique se as URLs de redirecionamento estão corretas
- Certifique-se de que o Site URL está configurado

### Erro de Variáveis de Ambiente

- Confirme que o arquivo `.env.local` está na raiz do projeto
- Reinicie o servidor após adicionar variáveis
- Verifique se não há espaços extras nas variáveis

### Erro de Conexão com Banco

- Verifique se o `DATABASE_URL` está correto
- Certifique-se de que substituiu `[PASSWORD]` pela senha real
- Teste a conexão via `psql` ou Drizzle Studio

### Migrations não Aplicadas

- Execute `yarn drizzle-kit generate` após mudanças no schema
- Aplique via Supabase SQL Editor se necessário
- Verifique se as tabelas foram criadas no Dashboard
