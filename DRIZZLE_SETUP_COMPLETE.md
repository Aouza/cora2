# 🎉 Drizzle ORM Setup Completo - Cora.Deep

## ✅ O que foi Implementado

### 1. **Instalação Completa**

```bash
✅ drizzle-orm - ORM principal
✅ drizzle-kit - CLI para migrations
✅ postgres - Driver PostgreSQL
✅ @types/pg - Types TypeScript
✅ tsx - Executor TypeScript direto
```

### 2. **Estrutura de Arquivos Criada**

```
db/
├── schema.ts      # 📋 Definição das tabelas e relacionamentos
├── index.ts       # 🔌 Conexão e exports principais
└── queries.ts     # 🔍 Exemplos de uso e queries

drizzle.config.ts  # ⚙️ Configuração do Drizzle Kit
drizzle/           # 📁 Pasta de migrations geradas
```

### 3. **Schema Implementado**

#### 🗃️ Tabelas:

1. **`users`** - Usuários do sistema
2. **`relatos`** - Posts do Mural Vivo
3. **`ecos`** - Reações simbólicas (🌱, 🫂, 💧)
4. **`relatorios`** - Análises emocionais (básico, profundo, renascimento)

#### 🔗 Relacionamentos:

- Users → Relatos (1:N)
- Users → Relatórios (1:N)
- Relatos → Ecos (1:N)

### 4. **Types TypeScript**

- ✅ Types inferidos automaticamente
- ✅ NewUser, NewRelato, NewEco, NewRelatorio
- ✅ Validação completa em tempo de compilação

### 5. **Scripts NPM Adicionados**

```json
{
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:studio": "drizzle-kit studio",
  "db:push": "drizzle-kit push",
  "db:example": "tsx db/queries.ts"
}
```

## 🚀 Como Usar

### 1. **Configurar Variáveis de Ambiente**

```env
# .env.local
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

### 2. **Aplicar Migrations**

```bash
# Gerar migration das mudanças
yarn db:generate

# Aplicar no Supabase (via SQL Editor)
# Cole o conteúdo de drizzle/[migration].sql
```

### 3. **Exemplos de Uso**

#### ➕ Inserir um Relato

```typescript
import { inserirRelato } from "./db/queries";

const relato = await inserirRelato("Hoje consegui me sentir melhor...", userId);
```

#### 🔍 Buscar Relatos do Usuário

```typescript
import { buscarRelatosDoUsuario } from "./db/queries";

const relatos = await buscarRelatosDoUsuario(userId);
```

#### ❤️ Adicionar Reação Simbólica

```typescript
import { adicionarEco } from "./db/queries";

await adicionarEco(relatoId, "🌱"); // Você vai florescer
await adicionarEco(relatoId, "🫂"); // Senti algo parecido
await adicionarEco(relatoId, "💧"); // Te entendo
```

#### 📊 Contar Reações

```typescript
import { contarEcosPorRelato } from "./db/queries";

const contadores = await contarEcosPorRelato(relatoId);
// { '🌱': 5, '🫂': 3, '💧': 2 }
```

#### 📄 Criar Relatório Emocional

```typescript
import { criarRelatorio } from "./db/queries";

const relatorio = await criarRelatorio(
  userId,
  "Análise emocional baseada nos últimos relatos...",
  "profundo"
);
```

### 4. **Query Complexa - Dashboard**

```typescript
import { obterDashboardUsuario } from "./db/queries";

const dashboard = await obterDashboardUsuario(userId);
// Retorna: usuario, totalRelatos, ultimoRelatorio, relatosRecentes
```

## 🛠️ Comandos Úteis

```bash
# Ver estado atual do banco
yarn db:studio

# Executar exemplos de teste
yarn db:example

# Gerar nova migration após mudança no schema
yarn db:generate

# Forçar sincronização com banco (cuidado!)
yarn db:push
```

## 📊 SQL Gerado (Migration)

```sql
-- Enums para tipos
CREATE TYPE "public"."tipo_eco" AS ENUM('🌱', '🫂', '💧');
CREATE TYPE "public"."tipo_relatorio" AS ENUM('basico', 'profundo', 'renascimento');

-- Tabela de usuários
CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" varchar(255) NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "users_email_unique" UNIQUE("email")
);

-- Tabela de relatos
CREATE TABLE "relatos" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "texto" text NOT NULL,
  "user_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Tabela de ecos (reações)
CREATE TABLE "ecos" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "relato_id" uuid NOT NULL,
  "tipo" "tipo_eco" NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Tabela de relatórios
CREATE TABLE "relatorios" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "conteudo" text NOT NULL,
  "tipo" "tipo_relatorio" NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Foreign Keys
ALTER TABLE "ecos" ADD CONSTRAINT "ecos_relato_id_relatos_id_fk"
  FOREIGN KEY ("relato_id") REFERENCES "public"."relatos"("id") ON DELETE cascade;

ALTER TABLE "relatorios" ADD CONSTRAINT "relatorios_user_id_users_id_fk"
  FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade;

ALTER TABLE "relatos" ADD CONSTRAINT "relatos_user_id_users_id_fk"
  FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade;
```

## 🎯 Próximos Passos Sugeridos

### 1. **Integração com Supabase Auth**

- Conectar `users` do Drizzle com `auth.users` do Supabase
- Trigger para criar perfil automaticamente

### 2. **Implementar nas Páginas**

- Substituir dados mockados por queries reais
- Conectar Mural Vivo com `relatos` e `ecos`
- Salvar Leituras Emocionais em `relatorios`

### 3. **Features Avançadas**

- Paginação nos relatos
- Sistema de notificações
- Analytics de uso
- Backup/export de dados

### 4. **Validação com Zod** (Opcional)

```typescript
import { z } from "zod";

const RelatoSchema = z.object({
  texto: z.string().min(10).max(500),
  userId: z.string().uuid(),
});

// Usar antes de inserir no banco
const dadosValidados = RelatoSchema.parse(dados);
```

## 🔧 Troubleshooting

### Migration não aplicada?

1. Verifique se `DATABASE_URL` está correto
2. Execute `yarn db:generate` após mudanças
3. Cole SQL manualmente no Supabase se necessário

### Erro de conexão?

1. Confirme senha do banco
2. Teste com `yarn db:studio`
3. Verifique firewall/VPN

### Types não funcionando?

1. Reinicie TypeScript server
2. Verifique imports do schema
3. Execute `yarn db:generate` novamente

## 🎉 Resultado Final

O Cora.Deep agora tem:

- ✅ ORM type-safe completo
- ✅ Migrations versionadas
- ✅ Queries prontas para uso
- ✅ Relacionamentos definidos
- ✅ Schema de produção

**Base sólida para evoluir o produto com dados reais! 🚀**
