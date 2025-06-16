# 🚀 Deploy Rápido - Cora

## ✅ **Checklist em 10 Passos**

### **1. 🧹 Preparação Final**

- [x] Build está funcionando (`yarn build` ✅)
- [x] Código de debug removido
- [x] Erros de linting corrigidos

### **2. 🔐 Configurar Variáveis de Ambiente**

Você precisa de 5 variáveis obrigatórias:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_DOMAIN=https://seu-dominio.com
```

### **3. 💳 Configurar Stripe (15 min)**

1. Ativar conta: https://dashboard.stripe.com/account/onboarding
2. Criar produto: Products → Create → R$ 9,90
3. Copiar Price ID
4. Configurar Webhook: `/api/stripe-webhook`

### **4. 📧 Configurar Resend (10 min)**

1. Criar conta: https://resend.com/
2. Adicionar domínio
3. Verificar DNS
4. Copiar API Key

### **5. 🤖 Configurar OpenAI (5 min)**

1. Acessar: https://platform.openai.com/api-keys
2. Criar nova chave
3. Configurar billing limit

### **6. 🌐 Deploy no Vercel (5 min)**

```bash
# 1. Push para GitHub
git add .
git commit -m "🚀 Deploy produção"
git push origin main

# 2. Deploy no Vercel
# - Acesse vercel.com
# - Import from GitHub
# - Adicione as variáveis de ambiente
```

### **7. 🔗 Configurar Domínio (20 min)**

1. **No Vercel:** Settings → Domains → Add
2. **No seu provedor de domínio:** Configure DNS
3. **Aguardar:** Propagação DNS (até 48h)

### **8. 🧪 Testes Essenciais**

- [ ] Site abre: `https://seu-dominio.com`
- [ ] Formulário funciona
- [ ] Pagamento funciona (cartão teste: `4242 4242 4242 4242`)
- [ ] Email chega na caixa de entrada
- [ ] Relatório tem conteúdo da IA

### **9. ⚙️ Configurações Finais**

- [ ] Webhook do Stripe configurado e testado
- [ ] Email "from" atualizado para seu domínio
- [ ] Monitoramento configurado

### **10. 🎉 Go Live!**

- [ ] Testar com cartão real (pequeno valor)
- [ ] Compartilhar com amigos/família
- [ ] Monitorar erros nas primeiras horas

---

## 🆘 **Problemas Comuns & Soluções**

### **❌ "Botão não funciona"**

- Verificar se PRICE_ID está configurado
- Verificar se dados estão no localStorage

### **❌ "Email não chega"**

- Verificar se domínio está verificado no Resend
- Verificar pasta de spam
- Testar com diferentes provedores de email

### **❌ "Webhook não funciona"**

- URL deve ser: `https://seu-dominio.com/api/stripe-webhook`
- Verificar se evento `checkout.session.completed` está ativo

### **❌ "Relatório vazio"**

- Verificar OPENAI_API_KEY
- Verificar se há créditos na conta OpenAI

---

## 📞 **Suporte Rápido**

### **🔧 Debug API**

```
GET https://seu-dominio.com/api/debug
```

Deve retornar `true` para todas as chaves.

### **📊 Monitoramento**

- **Vercel:** Functions logs
- **Stripe:** Dashboard → Events
- **OpenAI:** Platform → Usage

---

## 🎯 **Próximos Passos Pós-Deploy**

1. **📈 Analytics:** Google Analytics
2. **🔍 SEO:** Meta tags, sitemap
3. **⚡ Performance:** Otimizar imagens
4. **💰 Marketing:** Redes sociais, Product Hunt

---

**🚀 Tempo estimado total: 1-2 horas**
**💰 Custo inicial: ~$0-20/mês**

**Boa sorte com o lançamento! 🎊**
