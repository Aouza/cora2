# 🔧 Troubleshooting: Supabase Connection Issues on Vercel

## 🚨 Problema Identificado

- **Erro**: `ETIMEDOUT` ao conectar com IPs do Cloudflare (104.18.38.10, 172.64.149.246)
- **Causa**: Supabase bloqueando conexões da Vercel ou problema de rede

## 🔍 Diagnóstico

### 1. Verificar DATABASE_URL

```bash
# Verificar se a URL está correta
echo $DATABASE_URL
# Deve ser algo como: postgresql://postgres:[password]@[project].supabase.co:5432/postgres
```

### 2. Verificar Configurações do Supabase

- Acesse: https://supabase.com/dashboard/project/[YOUR_PROJECT]/settings/database
- Verifique se o projeto está ativo
- Confirme se não há restrições de IP

### 3. Testar Conexão Local

```bash
# Testar se funciona localmente
psql "postgresql://postgres:[password]@[project].supabase.co:5432/postgres"
```

## 🛠️ Soluções

### Solução 1: Verificar Supabase Status

- Acesse: https://status.supabase.com/
- Verificar se há problemas reportados

### Solução 2: Atualizar DATABASE_URL

- Use a URL direta do Supabase (não via Cloudflare)
- Formato: `postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres`

### Solução 3: Configurar Pool de Conexões

```typescript
// Configuração otimizada para Vercel
const postgresConfig = {
  max: 1, // Pool de 1 conexão
  idle_timeout: 10,
  connect_timeout: 30,
  ssl: "require",
  connection: {
    application_name: "cora2-vercel",
  },
};
```

### Solução 4: Usar Connection Pooling (Recomendado)

- Ativar connection pooling no Supabase
- Usar URL: `postgresql://postgres.[project]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

## 🚨 Ações Imediatas

1. **Verificar Supabase Dashboard**

   - Projeto ativo?
   - Configurações de rede corretas?

2. **Testar DATABASE_URL**

   - URL direta vs Cloudflare
   - Connection pooling ativado?

3. **Verificar Vercel Environment Variables**

   - DATABASE_URL configurada corretamente?
   - Sem caracteres especiais?

4. **Contatar Supabase Support**
   - Se problema persistir
   - Fornecer logs de erro

## 📊 Monitoramento

### APIs de Status

- `/api/health` - Health check básico
- `/api/db-status` - Status detalhado do banco

### Logs Importantes

- `ETIMEDOUT` - Timeout de conexão
- `AggregateError` - Múltiplas tentativas falharam
- `Vercel Runtime Timeout` - Função excedeu 60s

## 🔄 Próximos Passos

1. **Imediato**: Verificar configurações do Supabase
2. **Curto prazo**: Implementar connection pooling
3. **Longo prazo**: Considerar migração para outro provedor se problema persistir
