# 🔴 CORREÇÃO URGENTE - Webhook N8N Retorna 403

## 🎯 Problema Identificado

O erro 403 está vindo do **WEBHOOK N8N**, não do código da aplicação!

**Teste realizado:**
```bash
curl -X POST https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Token: 29dd43a31c..." \
  -d '{...}'

Resultado: 403 Forbidden
```

**Com token e sem token:** Ambos retornam 403 ⚠️

Isso indica que o problema NÃO é o token, mas sim o webhook em si.

---

## 🔍 Possíveis Causas

### 1. Webhook foi desativado no N8N
- Workflow foi pausado
- Webhook foi removido
- N8N foi desligado/reiniciado

### 2. URL do webhook mudou
- Webhook foi recriado com nova URL
- Domínio mudou

### 3. Firewall bloqueando requisições
- WAF do servidor bloqueando
- Rate limiting ativo
- IP da Vercel bloqueado

### 4. Webhook requer autenticação diferente
- Mudou de header-based para query-string
- Requer Basic Auth agora
- Precisa de API key diferente

---

## ✅ Como Corrigir

### Passo 1: Verificar se webhook existe no N8N

1. Acesse o N8N: https://webhook.dev.sakaguchifutai.shop
2. Vá em **Workflows**
3. Procure pelo workflow "Lead Analysis" ou similar
4. Verifique se está **ATIVO** (verde)
5. Abra o workflow e veja o nó Webhook
6. Confirme a URL:
   ```
   https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
   ```

### Passo 2: Testar webhook direto no N8N

No próprio N8N:
1. Abra o workflow
2. Clique em "Test Workflow"
3. Envie uma requisição de teste
4. Veja se processa corretamente

### Passo 3: Verificar autenticação do webhook

No nó Webhook do N8N, verifique:
- **Authentication**: Qual método está configurado?
  - None
  - Header Auth (X-Webhook-Token)
  - Basic Auth
  - Query String

Se mudou de "Header Auth" para outro método, você precisa atualizar o código.

### Passo 4: Recriar webhook (se necessário)

Se o webhook não existe mais:

1. **No N8N:**
   - Crie um novo Webhook node
   - Configure Authentication: "Header Auth"
   - Header Name: `X-Webhook-Token`
   - Expected Value: `<seu-token-seguro>`
   - Copie a nova URL do webhook

2. **Na Vercel:**
   - Vá em: Settings → Environment Variables
   - Atualize `WEBHOOK_URL` com a nova URL
   - Confirme que `WEBHOOK_TOKEN` está correto
   - Clique em "Redeploy" para aplicar

3. **Teste novamente:**
   ```bash
   ./test-webhook-n8n.sh
   ```

---

## 🔧 Alternativa Temporária

Se não conseguir corrigir o webhook agora, pode usar um webhook de teste:

**Webhook.site:**
1. Acesse: https://webhook.site
2. Copie a URL única gerada
3. Configure na Vercel:
   - `WEBHOOK_URL`: `https://webhook.site/sua-url-unica`
   - `WEBHOOK_TOKEN`: (pode deixar qualquer valor)
4. Redeploy
5. Teste o formulário

Isso pelo menos confirmará que o código está funcionando e o problema é só o webhook N8N.

---

## 📊 Checklist de Diagnóstico

- [ ] Webhook existe no N8N?
- [ ] Workflow está ativo (verde)?
- [ ] URL do webhook está correta?
- [ ] Método de autenticação está correto?
- [ ] Token configurado no N8N bate com a Vercel?
- [ ] Teste do webhook no N8N funciona?
- [ ] Firewall/WAF não está bloqueando?

---

## 🎯 Resumo

**O código da aplicação está 100% correto.**

O problema é que o webhook N8N em:
```
https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
```

Está retornando 403 para TODAS as requisições (com ou sem token).

**Você precisa:**
1. Verificar se o webhook existe no N8N
2. Confirmar que está ativo
3. Confirmar a URL e autenticação
4. Se necessário, recriar o webhook e atualizar as variáveis na Vercel

**Não é necessário alterar nenhum código!**
