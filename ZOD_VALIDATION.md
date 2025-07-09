# 🛡️ Sistema de Validação Zod - Cora.Deep

## 📋 Visão Geral

Implementamos **Zod** para validação robusta e type-safe em todo o Cora.Deep, garantindo dados seguros e consistentes.

## ✅ O que foi Implementado

### 1. **Schemas de Validação** (`db/validations.ts`)

- ✅ Validação de usuários (email único)
- ✅ Validação de relatos (10-500 chars, conteúdo)
- ✅ Validação de ecos (tipos válidos)
- ✅ Validação de relatórios (tamanho, tipo)
- ✅ Schemas para API routes e formulários

### 2. **Queries com Validação** (`db/queries-validated.ts`)

- ✅ Versões seguras de todas as queries
- ✅ Rate limiting básico
- ✅ Verificações de existência
- ✅ Tratamento de erros padronizado

### 3. **API Routes Seguras** (`/api/relatos/route.ts`)

- ✅ Validação de entrada automática
- ✅ Respostas padronizadas
- ✅ Error handling robusto

### 4. **Hooks para Forms** (`useRelatoForm.ts`)

- ✅ Validação em tempo real
- ✅ Feedback visual de erros
- ✅ Contadores de caracteres
- ✅ Estado de submissão

## 🔧 Como Usar

### 1. **Validação Simples**

```typescript
import { validateData, createRelatoSchema } from "@/db/validations";

// Lança erro se inválido
const dadosValidos = validateData(createRelatoSchema, dados);
```

### 2. **Validação Segura**

```typescript
import { safeValidateData } from "@/db/validations";

const result = safeValidateData(createRelatoSchema, dados);

if (result.success) {
  console.log("Dados válidos:", result.data);
} else {
  console.log("Erros:", result.errors);
}
```

### 3. **Em API Routes**

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = safeValidateData(createRelatoSchema, body);

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        errors: validation.errors,
      },
      { status: 400 }
    );
  }

  // Usar validation.data (type-safe)
}
```

### 4. **Em Formulários**

```typescript
const { formData, errors, handleChange, handleSubmit, canSubmit } =
  useRelatoForm({
    onSubmit: async (data) => {
      // data já está validado
    },
  });
```

## 📊 Schemas Disponíveis

### 🧑 **Usuários**

```typescript
createUserSchema; // Criar usuário
updateUserSchema; // Atualizar usuário
userSettingsSchema; // Configurações
```

### 💭 **Relatos**

```typescript
createRelatoSchema; // Básico (10-500 chars)
createRelatoWithValidationSchema; // + validações extras
relatoFormSchema; // Para formulários
updateRelatoSchema; // Atualização
```

### ❤️ **Ecos**

```typescript
createEcoSchema; // Tipo: 🌱, 🫂, 💧
```

### 📄 **Relatórios**

```typescript
createRelatorioSchema; // Tipo: basico, profundo, renascimento
```

### 🔍 **Queries**

```typescript
getRelatosQuerySchema; // Buscar relatos (limit, offset)
getRelatoriosQuerySchema; // Filtrar relatórios
dashboardQuerySchema; // Dados dashboard
```

## 🛡️ Validações Implementadas

### **Relatos - Validações Extras:**

1. **Tamanho:** 10-500 caracteres
2. **Conteúdo:** Não pode ser só espaços
3. **Diversidade:** Mínimo 30% palavras únicas
4. **Filtro:** Bloqueia palavras inadequadas
5. **Rate Limit:** Máximo 10 relatos recentes

### **Usuários:**

1. **Email:** Formato válido + único
2. **UUID:** Validação de IDs

### **Ecos:**

1. **Tipos válidos:** Apenas 🌱, 🫂, 💧
2. **Relato existe:** Verificação de FK
3. **Rate limiting:** Proteção contra spam

## 🎯 Exemplos Práticos

### 1. **Criar Relato Seguro**

```typescript
import { inserirRelatoSeguro } from "@/db/queries-validated";

const resultado = await inserirRelatoSeguro({
  texto: "Hoje foi um dia difícil, mas estou crescendo...",
  userId: "uuid-do-usuario",
});

if (resultado.success) {
  console.log("✅ Relato criado:", resultado.data);
} else {
  console.log("❌ Erros:", resultado.errors);
}
```

### 2. **Formulário com Validação**

```tsx
export function NovoRelatoForm() {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    characterCount,
    remainingCharacters,
    canSubmit,
  } = useRelatoForm({
    onSubmit: async (data) => {
      const response = await fetch("/api/relatos", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        // Sucesso!
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={formData.texto}
        onChange={(e) => handleChange("texto", e.target.value)}
        placeholder="Compartilhe o que está sentindo..."
      />
      <div>{characterCount}/500 caracteres</div>
      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <button disabled={!canSubmit}>Compartilhar</button>
    </form>
  );
}
```

## 🔍 Scripts Disponíveis

```bash
# Testar validações
yarn db:validate

# Outros scripts existentes
yarn db:seed-simple
yarn db:studio
```

## ⚡ Benefícios

### 1. **Type Safety**

- Tipos inferidos automaticamente
- Erros de compilação para dados inválidos
- IntelliSense completo

### 2. **Segurança**

- Validação de entrada em todas as camadas
- Proteção contra injection
- Rate limiting básico

### 3. **UX Melhorado**

- Feedback em tempo real
- Mensagens de erro claras
- Validação progressiva

### 4. **Manutenibilidade**

- Schemas centralizados
- Reutilização de validações
- Fácil extensão

## 🚀 Próximos Passos

### 1. **Integrar nos Componentes**

```typescript
// Substituir formulários mockados por versões com Zod
// Usar hooks de validação nos forms existentes
```

### 2. **Middleware Avançado**

```typescript
// Rate limiting por IP
// Validação de autenticação
// Logs de segurança
```

### 3. **Validações Extras**

```typescript
// Detectar spam
// Análise de sentimento
// Moderação de conteúdo
```

## 🎉 Resultado

O Cora.Deep agora tem:

- ✅ **Validação robusta** em todas as camadas
- ✅ **Type safety** completo
- ✅ **Proteção contra dados inválidos**
- ✅ **UX melhorado** com feedback em tempo real
- ✅ **Base sólida** para escalabilidade

**Dados seguros e experiência fluida garantidos! 🛡️💜**
