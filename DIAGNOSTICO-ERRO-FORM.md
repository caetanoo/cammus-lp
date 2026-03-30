# Diagnóstico de Erro no Formulário

## Problema
Formulário não consegue enviar dados para o N8N na produção (Vercel).

## Possíveis Causas e Soluções

### ❌ Causa 1: Variáveis de ambiente não configuradas na Vercel

**Sintomas:**
- Console do navegador: `Erro ao enviar formulário: 500`
- Logs da Vercel: `❌ ERRO: WEBHOOK_TOKEN não definido` ou `WEBHOOK_URL não definido`

**Solução:**
1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto: `cammus-ai`
3. Vá em: `Settings` → `Environment Variables`
4. Adicione as variáveis:
   ```
   WEBHOOK_URL = https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
   WEBHOOK_TOKEN = (seu token de 64 caracteres)
   ```
5. **IMPORTANTE:** Selecione ambiente `Production`
6. Clique em `Save`
7. Vá em `Deployments` → clique nos 3 pontos do último deploy → `Redeploy`

---

### ❌ Causa 2: Webhook N8N não está respondendo

**Sintomas:**
- Console do navegador: `Erro ao enviar formulário: 504` ou `Tempo esgotado`
- Logs da Vercel: `❌ Timeout ao conectar com webhook` ou `❌ Erro de conexão`

**Solução:**
1. Teste o webhook diretamente:
   ```bash
   curl -X POST https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis \
     -H "Content-Type: application/json" \
     -H "X-Webhook-Token: SEU_TOKEN_AQUI" \
     -d '{"test": true}'
   ```
2. Se não responder, o problema está no N8N (não no código)
3. Verifique se o N8N está online e o workflow ativo

---

### ❌ Causa 3: CORS bloqueando requisição

**Sintomas:**
- Console do navegador: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solução:**
1. Adicione variável de ambiente na Vercel:
   ```
   FRONTEND_URL = https://cammus-ai.vercel.app
   ```
2. Redeploy

---

### ❌ Causa 4: DOMPurify não carregou (erro 404)

**Sintomas:**
- Console do navegador: `404 GET /assets/dompurify.min.js`
- Formulário não envia

**Solução:**
✅ Já corrigido nos últimos commits. Aguarde redeploy da Vercel.

---

## 🔍 Como Ver os Logs da Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto: `cammus-ai`
3. Clique em `Deployments`
4. Clique no deployment mais recente
5. Clique em `Functions` → `submit-lead`
6. Veja os logs em tempo real

**Os logs vão te dizer EXATAMENTE qual é o erro.**

---

## 🧪 Teste Local (para confirmar que o código funciona)

Se quiser testar localmente:

```bash
# Terminal 1: Backend
cd backend
npm install
cp .env.example .env
# Edite .env com suas credenciais
npm start

# Terminal 2: Frontend
cd ..
python3 -m http.server 8000

# Abra: http://localhost:8000/Formulario Cammus/forms.html
# Tente enviar o formulário
```

Se funcionar localmente mas não na Vercel → problema é nas variáveis de ambiente da Vercel.

---

## ✅ Checklist Final

Antes de fazer redeploy, confirme:

- [ ] Variáveis `WEBHOOK_URL` e `WEBHOOK_TOKEN` configuradas na Vercel
- [ ] Ambiente selecionado: `Production`
- [ ] Webhook N8N está online (teste com curl)
- [ ] Último commit está no GitHub (cammus-ai)
- [ ] Redeploy foi feito após adicionar variáveis

---

## 📞 Próximos Passos

**Me envie:**
1. Screenshot do console do navegador (F12) com o erro
2. Screenshot das variáveis de ambiente da Vercel (Settings → Environment Variables)
3. Ou copie e cole os logs da função `submit-lead` na Vercel

Com essas informações, consigo te dar a solução exata! 🎯
