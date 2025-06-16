# 🔐 Variáveis de Ambiente - Cora

## 📋 **Variáveis Obrigatórias**

### **💳 Stripe (Pagamentos)**

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxxxxxxxxxxxxxxx
```

### **🤖 OpenAI (IA)**

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### **📧 Resend (Email)**

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

### **🌐 Domínio**

```env
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

---

## 🔧 **Configuração por Ambiente**

### **🧪 Desenvolvimento (.env.local)**

```env
# Stripe - Chaves de teste
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxxxxxxxxxxxxxxx

# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Domínio local
NEXT_PUBLIC_DOMAIN=http://localhost:3000

# Ambiente
NODE_ENV=development
```

### **🚀 Produção (.env.production)**

```env
# Stripe - Chaves LIVE (produção)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxxxxxxxxxxxxxxx

# OpenAI (mesma chave)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Resend (mesma chave ou diferente para produção)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Domínio final
NEXT_PUBLIC_DOMAIN=https://seu-dominio.com

# Webhook do Stripe (configurar após deploy)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Ambiente
NODE_ENV=production
```

---

## 🔑 **Como Obter as Chaves**

### **💳 Stripe**

1. Acesse: https://dashboard.stripe.com/
2. Developers → API keys
3. **Teste:** `pk_test_` e `sk_test_`
4. **Produção:** `pk_live_` e `sk_live_` (após ativar conta)

### **🤖 OpenAI**

1. Acesse: https://platform.openai.com/api-keys
2. Create new secret key
3. Configure billing limits

### **📧 Resend**

1. Acesse: https://resend.com/
2. API Keys → Create API Key
3. Configure domínio verificado

---

## 🔍 **Validação das Variáveis**

### **✅ Script de Verificação**

Acesse: `http://localhost:3000/api/debug`

Resposta esperada:

```json
{
  "stripe": {
    "hasPublishableKey": true,
    "hasSecretKey": true,
    "hasPriceId": true
  },
  "general": {
    "hasDomain": true,
    "nodeEnv": "development"
  },
  "resend": {
    "hasApiKey": true
  }
}
```

### **❌ Problemas Comuns**

- **false nos campos**: Variável não configurada
- **API não responde**: Servidor não iniciado
- **Erro 500**: Chave inválida

---

## 🚀 **Deploy em Plataformas**

### **📦 Vercel**

1. Settings → Environment Variables
2. Adicionar cada variável individualmente
3. Selecionar environments: Production, Preview, Development

### **🚂 Railway**

```bash
railway variables:set STRIPE_SECRET_KEY=sk_live_xxx
railway variables:set OPENAI_API_KEY=sk-xxx
# ... etc
```

### **🌊 DigitalOcean App Platform**

1. Settings → Environment Variables
2. Adicionar via interface ou YAML

---

## ⚠️ **Segurança**

### **✅ Boas Práticas**

- ✅ Nunca commite arquivos `.env*` no Git
- ✅ Use chaves de teste em desenvolvimento
- ✅ Rotacione chaves periodicamente
- ✅ Configure limites de billing
- ✅ Monitor uso das APIs

### **❌ Nunca Faça**

- ❌ Hardcode chaves no código
- ❌ Compartilhe chaves em chat/email
- ❌ Use chaves de produção em desenvolvimento
- ❌ Deixe chaves em repositórios públicos

---

## 🆘 **Troubleshooting**

### **🐛 Erro: "STRIPE_SECRET_KEY não configurada"**

- Verifique se a variável está definida
- Reinicie o servidor após adicionar

### **🐛 Erro: "RESEND_API_KEY is required"**

- Configure a chave do Resend
- Verifique se não há espaços extras

### **🐛 Erro: "OpenAI API key not found"**

- Configure OPENAI_API_KEY
- Verifique se tem créditos na conta

### **🔍 Debug Geral**

```bash
# Verificar variáveis carregadas
echo $STRIPE_SECRET_KEY
echo $OPENAI_API_KEY
echo $RESEND_API_KEY
```

---

**💡 Dica:** Mantenha um backup seguro das suas chaves de produção!
