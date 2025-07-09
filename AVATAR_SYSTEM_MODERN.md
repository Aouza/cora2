# 🎨 Sistema de Avatar Moderno - Cora.Deep

## 📋 Problema Original

Você estava enfrentando **dois problemas distintos**:

### ❌ **Problema 1**: URL de Avatar Inválida

```
https://lh3.googleusercontent.com/...=s96-c?s=64
                                            ↑ ERRO: segundo `?` deveria ser `&`
```

- **Causa**: Parâmetros conflitantes na URL do Google
- **Sintoma**: Erro 429 (Too Many Requests) por tentativas de revalidação
- **Resultado**: Avatar não aparecia, só iniciais

### ❌ **Problema 2**: Tabela `profiles` Não Existia

```
POST /rest/v1/profiles → 404 Not Found
```

- **Causa**: Código esperava tabela `profiles` do Supabase, mas só existia `users` no Drizzle
- **Sintoma**: Erro 404 ao tentar salvar perfil do usuário
- **Resultado**: Dados do usuário não persistiam corretamente

## ✅ Solução Implementada: **Arquitetura Moderna e Unificada**

### 🏗️ **1. Schema Drizzle Unificado**

**Antes:**

```typescript
// Só existia `users` no Drizzle
// Supabase Auth tentava gravar em `profiles` (inexistente)
```

**Depois:**

```typescript
// db/schema.ts
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // Sync com auth.users do Supabase
  email: varchar("email", { length: 255 }).notNull().unique(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"), // ✅ URL já corrigida
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relações agora apontam para `profiles` em vez de `users`
export const relatos = pgTable("relatos", {
  // ...
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" }) // ✅ Mudança
    .notNull(),
});
```

### 🛠️ **2. Utilities de Avatar Modernas**

**`lib/avatar-utils.ts`** - Sistema centralizado e inteligente:

```typescript
// ✅ Correção automática de URLs do Google
export function getFixedAvatarUrl(avatarUrl: string, size = 64): string | null {
  if (avatarUrl?.includes("googleusercontent.com")) {
    const baseUrl =
      avatarUrl.split("=s")[0] + "=s" + avatarUrl.split("=s")[1]?.split("?")[0];
    return `${baseUrl.split("=s")[0]}=s${size * 2}-c`; // Retina-ready
  }
  return avatarUrl;
}

// ✅ Iniciais inteligentes (prioridade: full_name > name > email)
export function generateUserInitials(user: User): string {
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
  if (fullName) {
    const words = fullName.trim().split(/\s+/);
    return words.length >= 2
      ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
      : words[0].substring(0, 2).toUpperCase();
  }
  // Fallback para email
  return user.email?.split("@")[0].substring(0, 2).toUpperCase() || "U";
}

// ✅ Nome de exibição inteligente
export function getUserDisplayName(user: User): string {
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Usuário"
  );
}
```

### 🔄 **3. Hook de Auth Modernizado**

**`src/hooks/useAuth.tsx`** - Sincronização automática com Drizzle:

```typescript
// ✅ Upsert inteligente com fallback
if (event === "SIGNED_IN" && session?.user) {
  try {
    // Tentar Drizzle primeiro (preferência)
    const userData = {
      id: session.user.id,
      email: session.user.email!,
      fullName: session.user.user_metadata.full_name || null,
      avatarUrl: getFixedAvatarUrl(session.user.user_metadata.avatar_url), // ✅ URL já corrigida
      updatedAt: new Date(),
    };

    const existingProfile = await db.select().from(profiles).where(eq(profiles.id, session.user.id));

    if (existingProfile.length > 0) {
      await db.update(profiles).set(userData).where(eq(profiles.id, session.user.id));
    } else {
      await db.insert(profiles).values(userData);
    }
  } catch (error) {
    // ✅ Fallback gracioso para Supabase
    await supabase.from("profiles").upsert({...});
  }
}
```

### 🎨 **4. Componentes de Avatar Modernos**

**Antes (Header.tsx):**

```typescript
// Código complexo, duplicado, sem tratamento de erro
const getFixedAvatarUrl = (url: string) => {
  /* lógica local */
};
const getUserInitials = () => {
  /* lógica local */
};
```

**Depois:**

```typescript
// ✅ Limpo, reutilizável, centralizado
import { getUserDisplayInfo, shouldShowAvatar } from "../../lib/avatar-utils";

const userDisplay = getUserDisplayInfo(user);
const showAvatar = shouldShowAvatar(user) && !avatarError;

// Avatar com fallback automático
{showAvatar && userDisplay.avatarUrl ? (
  <img
    src={userDisplay.avatarUrl} // ✅ URL já corrigida
    alt={`Avatar de ${userDisplay.name}`}
    onError={handleAvatarError}
    onLoad={handleAvatarLoad}
  />
) : (
  <div className="avatar-initials">
    {userDisplay.initials} {/* ✅ Iniciais inteligentes */}
  </div>
)}
```

## 🚀 **Benefícios da Solução Moderna**

### 🏆 **1. Arquitetura Unificada**

- ✅ **Uma fonte da verdade**: Tabela `profiles` sincronizada
- ✅ **Compatibilidade**: Mantém `users` existentes para migração gradual
- ✅ **Type Safety**: Types TypeScript automáticos via Drizzle

### 🛡️ **2. Sistema de Avatar Robusto**

- ✅ **URLs corrigidas automaticamente** (sem erro 429)
- ✅ **Fallback inteligente** para iniciais
- ✅ **Carregamento retina-ready** (2x resolution)
- ✅ **Debug em desenvolvimento** com logs detalhados

### 🔧 **3. Manutenibilidade**

- ✅ **Código centralizado** em `avatar-utils.ts`
- ✅ **Componentes limpos** sem lógica duplicada
- ✅ **Tratamento de erros padronizado**
- ✅ **Fácil teste e debug**

### 📱 **4. Experiência do Usuário**

- ✅ **Avatars aparecem corretamente**
- ✅ **Iniciais como fallback elegante**
- ✅ **Carregamento mais rápido**
- ✅ **Consistência visual**

## 📋 **Como Aplicar no Supabase**

### 1. **Executar Migration**

```sql
-- No Supabase SQL Editor, cole o conteúdo de:
-- drizzle/0001_green_omega_red.sql

CREATE TABLE "profiles" (
  "id" uuid PRIMARY KEY NOT NULL,
  "email" varchar(255) NOT NULL,
  "full_name" text,
  "avatar_url" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "profiles_email_unique" UNIQUE("email")
);

-- Atualizar foreign keys para apontar para profiles
ALTER TABLE "relatorios" DROP CONSTRAINT "relatorios_user_id_users_id_fk";
ALTER TABLE "relatos" DROP CONSTRAINT "relatos_user_id_users_id_fk";
ALTER TABLE "relatorios" ADD CONSTRAINT "relatorios_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade;
ALTER TABLE "relatos" ADD CONSTRAINT "relatos_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade;
```

### 2. **Configurar RLS (Row Level Security)**

```sql
-- Habilitar RLS na tabela profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política: usuários podem ver/editar apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);
```

### 3. **Trigger para Sync Automático (Opcional)**

```sql
-- Criar função que sincroniza auth.users com profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger que executa a função quando usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 🎯 **Resultado Final**

### ✅ **Problemas Resolvidos**

1. **Avatar URLs**: Corrigidas automaticamente, sem erro 429
2. **Tabela profiles**: Criada e sincronizada via Drizzle
3. **Consistência**: Mesma lógica em Header e DashboardHeader
4. **Manutenibilidade**: Código centralizado e reutilizável

### 🚀 **Sistema Pronto Para**

- Expansão com novas funcionalidades de perfil
- Integração com sistema de uploads de avatar
- Análytics e métricas de uso
- Internacionalização (i18n)

## 📚 **Próximos Passos Sugeridos**

1. **Migração dos Dados Existentes**

```sql
-- Migrar dados de users para profiles (se necessário)
INSERT INTO profiles (id, email, created_at, updated_at)
SELECT gen_random_uuid(), email, created_at, updated_at FROM users;
```

2. **Upload de Avatars Personalizado**

```typescript
// Futuro: integrar com Supabase Storage
const uploadAvatar = async (file: File) => {
  const { data } = await supabase.storage
    .from("avatars")
    .upload(`${user.id}/avatar.jpg`, file);
  // Atualizar profiles.avatar_url
};
```

3. **Configurações de Privacidade**

```typescript
// Futuro: adicionar colunas de privacidade
ALTER TABLE profiles ADD COLUMN avatar_visibility VARCHAR(20) DEFAULT 'public';
```

## 🏆 **Conclusão**

A solução implementada é **moderna, robusta e escalável**:

- ✅ **Sem gambiarras** - arquitetura limpa e bem estruturada
- ✅ **Sem dependências desnecessárias** - usa ferramentas já existentes
- ✅ **Performance otimizada** - URLs corrigidas, carregamento eficiente
- ✅ **Facilmente extensível** - base sólida para futuras funcionalidades
- ✅ **Developer Experience** - debug fácil, código legível, tipos seguros

O sistema de avatars agora funciona de forma consistente e confiável em toda a aplicação! 🎉
