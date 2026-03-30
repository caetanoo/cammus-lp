# 🔧 Fix: 404 NOT_FOUND na API Vercel

## ❌ Erro
```
404: NOT_FOUND
Code: NOT_FOUND
ID: gru1::bhv4n-1774872849094-5cf7306e4b8d
```

Isso significa que a Vercel não encontrou a função serverless `/api/submit-lead`.

---

## ✅ Diagnóstico: Arquivo Existe!

O arquivo `api/submit-lead.js` existe no GitHub e está correto. O problema é que a **Vercel não o deployou como função serverless**.

---

## 🎯 Solução 1: Verificar se Função Foi Deployada

### Passo 1: Acessar Functions na Vercel
```
1. Acesse: https://vercel.com/dashboard
2. Selecione: cammus-ai
3. Clique em: Deployments
4. Clique no último deployment (Ready ✅)
5. Clique em: Functions
```

### Passo 2: Procurar submit-lead
```
Você deve ver:
✅ api/submit-lead
   Region: gru1
   Duration: xxx ms
```

**Se NÃO aparecer:**
- A função não foi deployada
- Solução: Redeploy forçado (abaixo)

**Se aparecer mas ainda dá 404:**
- Problema de cache ou roteamento
- Solução: Clear cache e redeploy

---

## 🎯 Solução 2: Redeploy Forçado (Sem Cache)

### Método A: Via Dashboard
```
1. Na Vercel: Deployments
2. Clique nos 3 pontos (⋮) do último deploy
3. Clique em: Redeploy
4. ⚠️ IMPORTANTE: Desmarque "Use existing Build Cache"
5. Clique em: Redeploy
```

### Método B: Via CLI (se tiver instalado)
```bash
vercel --force
```

---

## 🎯 Solução 3: Verificar Variáveis de Ambiente

**CRÍTICO:** Se as variáveis não estiverem configuradas, a função pode não inicializar corretamente.

```
1. Vercel Dashboard → Settings → Environment Variables
2. Verifique se existem:
   ✅ WEBHOOK_URL
   ✅ WEBHOOK_TOKEN

3. Se NÃO existirem, ADICIONE:
   Nome: WEBHOOK_URL
   Value: https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
   Environment: Production ✅

   Nome: WEBHOOK_TOKEN
   Value: (seu token de 64 caracteres)
   Environment: Production ✅

4. Clique em Save
5. REDEPLOY (Deployments → Redeploy)
```

---

## 🎯 Solução 4: Verificar Logs da Função

```
1. Vercel Dashboard → Deployments
2. Clique no último deployment
3. Clique em: Functions → submit-lead
4. Veja se há erros nos logs

Erros comuns:
❌ "WEBHOOK_TOKEN não definido" → Adicione variável de ambiente
❌ "Module not found" → Problema no código (improvável)
❌ "Cannot find module" → Dependência faltando
```

---

## 🎯 Solução 5: Testar a URL Diretamente

Teste se a função está acessível:

```bash
curl -X POST https://cammus-ai.vercel.app/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Resultado esperado:**
```json
{"error": "Campos obrigatórios ausentes (lead, segmentacao, qualificacao)"}
```

**Se retornar 404:**
- Função não foi deployada
- Redeploy forçado necessário

---

## 🎯 Solução 6: Verificar vercel.json

Confirme que o arquivo `vercel.json` tem:

```json
{
  "functions": {
    "api/submit-lead.js": {
      "maxDuration": 30,
      "memory": 1024
    }
  }
}
```

Se estiver diferente, corrija e faça commit + push + redeploy.

---

## 🎯 Solução 7: Problema de Roteamento (API Routes)

A Vercel detecta funções serverless em:
- `/api/*.js` → vira `/api/*`
- `/api/*.ts` → vira `/api/*`

Confirme que:
1. Arquivo está em: `api/submit-lead.js` ✅
2. Não tem outra pasta `/pages/api/` (conflito com Next.js)
3. URL chamada é: `/api/submit-lead` (sem `.js`)

---

## ✅ Checklist de Verificação

- [ ] Função aparece em Deployments → Functions
- [ ] Variáveis WEBHOOK_URL e WEBHOOK_TOKEN configuradas
- [ ] Ambiente selecionado: Production
- [ ] Redeploy foi feito (sem cache)
- [ ] Teste com curl retorna erro 400 (não 404)
- [ ] Logs da função não mostram erros

---

## 🚨 Se NADA Funcionar: Alternativa Temporária

Use a função serverless **diretamente via CDN/jsDelivr**:

Edite `config-api.js`:
```javascript
const API_CONFIG = {
    ambiente: 'vercel',
    endpoints: {
        // Forçar URL completa (fallback)
        vercel: 'https://cammus-ai.vercel.app/api/submit-lead',
    }
};
```

Isso força o uso da URL completa ao invés do path relativo.

---

## 📞 Próximos Passos

**Me envie:**
1. Screenshot da aba "Functions" no deployment da Vercel
2. Se a função `submit-lead` aparece listada
3. Resultado do teste com curl (se conseguir fazer)
4. Se as variáveis de ambiente estão configuradas

Com essas informações, consigo identificar exatamente o que está acontecendo! 🔍
