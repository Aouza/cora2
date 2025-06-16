# 🚀 Guia de Deploy para Produção - Cora

## 📋 **Checklist Completo para Produção**

### **1. 🛠️ Preparação do Código**

#### **✅ Limpeza do Código de Debug**

- [ ] Remover logs de console em produção
- [ ] Remover botões de teste da página `/pagamento`
- [ ] Remover alertas de debug
- [ ] Remover APIs de simulação (`simulate-webhook-*`)

#### **✅ Configurações de Produção**

- [ ] Configurar variáveis de environment
- [ ] Atualizar URLs de desenvolvimento para produção
- [ ] Configurar domínio personalizado

---

### **2. 🔐 Variáveis de Ambiente Necessárias**

Crie um arquivo `.env.production` com:

```env
# ========== OBRIGATÓRIAS ==========

# Stripe (Produção - chaves reais)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxxxxxxxxxxxxxxx

# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Domínio (URL final do site)
NEXT_PUBLIC_DOMAIN=https://seu-dominio.com

# ========== OPCIONAIS ==========

# Ambiente
NODE_ENV=production

# Stripe Webhook Secret (configurar após deploy)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

---

### **3. 🏪 Configuração dos Serviços Externos**

#### **💳 Stripe (Pagamentos)**

1. **Criar conta de produção:**

   - Acesse: https://dashboard.stripe.com/
   - Ative sua conta (verificação de identidade)
   - Configure método de recebimento

2. **Criar produto:**

   - Products → Create product
   - Nome: "Análise Emocional Cora"
   - Preço: R$ 9,90 (BRL)
   - Tipo: One-time payment

3. **Configurar Webhook:**
   - Developers → Webhooks → Add endpoint
   - URL: `https://seu-dominio.com/api/stripe-webhook`
   - Events: `checkout.session.completed`

#### **🤖 OpenAI (IA)**

1. **Configurar API Key:**
   - Acesse: https://platform.openai.com/api-keys
   - Create new secret key
   - Configure billing limits

#### **📧 Resend (Email)**

1. **Configurar domínio:**

   - Domains → Add Domain
   - Adicione: `seu-dominio.com`
   - Configure registros DNS conforme instruções

2. **Verificar domínio:**

   - Aguarde verificação DNS
   - Status deve ser "Verified"

3. **Atualizar email "from":**
   ```typescript
   from: "Cora <noreply@seu-dominio.com>";
   ```

---

### **4. 🌐 Opções de Deploy**

#### **🥇 Recomendado: Vercel (Next.js otimizado)**

1. **Deploy via GitHub:**

   ```bash
   # 1. Push código para GitHub
   git add .
   git commit -m "Deploy para produção"
   git push origin main

   # 2. Conectar no Vercel
   # - Acesse: https://vercel.com
   # - Import Project from GitHub
   # - Selecione o repositório
   ```

2. **Configurar variáveis de ambiente:**

   - Settings → Environment Variables
   - Adicione todas as variáveis do `.env.production`

3. **Configurar domínio personalizado:**
   - Settings → Domains
   - Add Domain: `seu-dominio.com`
   - Configure DNS conforme instruções

#### **🥈 Alternativa: Railway**

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login e deploy
railway login
railway init
railway up
```

#### **🥉 Alternativa: DigitalOcean App Platform**

1. Create App → GitHub
2. Configurar build:
   - Build Command: `yarn build`
   - Run Command: `yarn start`

---

### **5. 🧪 Testes Pré-Produção**

#### **✅ Checklist de Testes**

- [ ] **Formulário funciona** (preenchimento e validação)
- [ ] **Botão pagamento funciona** (redireciona para Stripe)
- [ ] **Pagamento teste funciona** (usar cartão `4242 4242 4242 4242`)
- [ ] **Webhook funciona** (relatório é enviado por email)
- [ ] **Email chega na caixa de entrada** (verificar spam também)
- [ ] **Relatório está sendo gerado** (conteúdo da OpenAI)
- [ ] **Página de sucesso funciona**
- [ ] **Site responsivo funciona** (mobile/desktop)

#### **🔧 Debug em Produção**

Acesse: `https://seu-dominio.com/api/debug`

Deve retornar:

```json
{
  "stripe": {
    "hasPublishableKey": true,
    "hasSecretKey": true,
    "hasPriceId": true
  },
  "general": {
    "hasDomain": true,
    "nodeEnv": "production"
  },
  "resend": {
    "hasApiKey": true
  }
}
```

---

### **6. 📊 Monitoramento Pós-Deploy**

#### **📈 Analytics Recomendados**

- Google Analytics 4
- Hotjar (mapas de calor)
- Vercel Analytics (se usando Vercel)

#### **🚨 Monitoramento de Erros**

- Sentry (recomendado)
- LogRocket
- Vercel Speed Insights

#### **💰 Monitoramento Financeiro**

- Dashboard do Stripe
- Webhooks de notificação
- Relatórios automáticos

---

### **7. ⚡ Otimizações de Performance**

#### **🖼️ Imagens**

```bash
# Otimizar imagens
yarn add next-optimized-images
```

#### **📦 Bundle Size**

```bash
# Analisar bundle
yarn add @next/bundle-analyzer
```

#### **🎯 SEO**

- Adicionar meta tags
- Configurar sitemap.xml
- Configurar robots.txt

---

### **8. 🔒 Segurança**

#### **✅ Checklist de Segurança**

- [ ] HTTPS configurado
- [ ] Headers de segurança
- [ ] Rate limiting em APIs
- [ ] Validação de entrada em todas APIs
- [ ] Webhook signature verification
- [ ] Environment variables protegidas

#### **⚡ Headers de Segurança**

```javascript
// next.config.mjs
const nextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        // ... outros headers
      ],
    },
  ],
};
```

---

### **9. 📱 Configurações Finais**

#### **🌟 Favicon e Manifest**

- [ ] Favicon personalizado
- [ ] Apple touch icons
- [ ] Manifest.json para PWA

#### **📞 Suporte ao Cliente**

- [ ] Email de contato configurado
- [ ] WhatsApp Business (opcional)
- [ ] FAQ/Help section

---

### **10. 🎉 Go Live Checklist**

#### **🚀 Deploy Final**

```bash
# 1. Limpeza final
yarn build
yarn lint

# 2. Commit final
git add .
git commit -m "🚀 PROD: Versão final para produção"
git push origin main

# 3. Verificar deploy automático
# 4. Testar site em produção
# 5. Compartilhar com primeiros usuários
```

#### **📢 Marketing de Lançamento**

- [ ] Post em redes sociais
- [ ] Email para lista de interessados
- [ ] Product Hunt submission
- [ ] Press release (se aplicável)

---

## 🆘 **Suporte Pós-Deploy**

### **📞 Contatos Importantes**

- Stripe Support: https://support.stripe.com
- Vercel Support: https://vercel.com/help
- OpenAI Support: https://help.openai.com

### **🐛 Troubleshooting Comum**

- **Webhook não funciona**: Verificar URL e secret
- **Email não chega**: Verificar domínio no Resend
- **Pagamento falha**: Verificar chaves do Stripe
- **Relatório não gera**: Verificar OpenAI API key

---

## 🎯 **Próximos Passos (Pós-Lançamento)**

1. **📊 Analytics e Métricas**
2. **🔄 Feedback dos Usuários**
3. **⚡ Otimizações de Performance**
4. **🆕 Novas Funcionalidades**
5. **💰 Escalabilidade**

---

**🚀 Pronto para decolar! Boa sorte com o lançamento!**
