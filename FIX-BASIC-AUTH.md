# ✅ CORREÇÃO APLICADA - Basic Authentication

## 🎯 Problema Identificado

Análise do log da Vercel revelou que o webhook N8N **mudou o método de autenticação**:

**Log crítico (linha 54):**
```
'www-authenticate': 'Basic realm="Webhook"'
```

Este header indica que o N8N agora exige **HTTP Basic Authentication**.

---

## 🔄 O que mudou

### ❌ ANTES (Header Token):
```javascript
headers: {
  'X-Webhook-Token': 'seu-token-aqui'
}
```

### ✅ AGORA (Basic Auth):
```javascript
headers: {
  'Authorization': 'Basic ' + base64(username:password)
}
```

---

## ✅ Correção Aplicada

**Arquivo modificado:** `api/submit-lead.js`

**Mudança:**
```javascript
// ANTES
'X-Webhook-Token': process.env.WEBHOOK_TOKEN

// DEPOIS
'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
```

**Username:** Configurável via `WEBHOOK_USERNAME` (padrão: vazio)
**Password:** `WEBHOOK_TOKEN` (seu token existente)

---

## 🔧 Como Configurar na Vercel

### Opção 1: Username vazio (padrão)

1. Vá em: Vercel Dashboard → Settings → Environment Variables
2. Confirme que `WEBHOOK_TOKEN` está configurado
3. **Não precisa adicionar `WEBHOOK_USERNAME`** (usa vazio por padrão)
4. Clique em "Redeploy"

Basic Auth será: `Basic base64(:seu-token)`

### Opção 2: Com username personalizado

Se o N8N exigir um username específico:

1. Vá em: Vercel Dashboard → Settings → Environment Variables
2. Adicione nova variável:
   - **Name:** `WEBHOOK_USERNAME`
   - **Value:** `webhook` (ou o username que o N8N espera)
3. Confirme que `WEBHOOK_TOKEN` está correto
4. Clique em "Redeploy"

Basic Auth será: `Basic base64(webhook:seu-token)`

---

## 🧪 Como Testar

### Teste 1: Username vazio (padrão)

```bash
# Encode manualmente
echo -n ":29dd43a31c2419183e0eb7d7b298335050807c5d83fb5c231cf02c3b740e0e1a" | base64

# Resultado: OjI5ZGQ0M2EzMWMyNDE5MTgzZTBlYjdkN2IyOTgzMzUwNTA4MDdjNWQ4M2ZiNWMyMzFjZjAyYzNiNzQwZTBlMWE=

# Testar webhook
curl -X POST https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis \
  -H "Authorization: Basic OjI5ZGQ0M2EzMWMyNDE5MTgzZTBlYjdkN2IyOTgzMzUwNTA4MDdjNWQ4M2ZiNWMyMzFjZjAyYzNiNzQwZTBlMWE=" \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### Teste 2: Com username "webhook"

```bash
# Encode manualmente
echo -n "webhook:29dd43a31c2419183e0eb7d7b298335050807c5d83fb5c231cf02c3b740e0e1a" | base64

# Resultado: d2ViaG9vazoyOWRkNDNhMzFjMjQxOTE4M2UwZWI3ZDdiMjk4MzM1MDUwODA3YzVkODNmYjVjMjMxY2YwMmMzYjc0MGUwZTFh

# Testar webhook
curl -X POST https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis \
  -H "Authorization: Basic d2ViaG9vazoyOWRkNDNhMzFjMjQxOTE4M2UwZWI3ZDdiMjk4MzM1MDUwODA3YzVkODNmYjVjMjMxY2YwMmMzYjc0MGUwZTFh" \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Status esperado:**
- ✅ **200/201**: Autenticação funcionando
- ❌ **403**: Username ou password incorretos
- ❌ **401**: Header malformado

---

## 📊 Checklist

Após o redeploy:

- [ ] Código atualizado com Basic Auth
- [ ] `WEBHOOK_TOKEN` configurado na Vercel
- [ ] `WEBHOOK_USERNAME` configurado (se necessário)
- [ ] Redeploy realizado
- [ ] Teste do webhook retorna 200/201
- [ ] Formulário envia com sucesso

---

## 🔍 Logs para Verificar

Após o redeploy, os logs da Vercel devem mostrar:

```
🔍 Autenticação configurada:
  Username: (vazio)
  Password (primeiros 10): 29dd43a31c...
  Basic Auth: Basic OjI5ZGQ0M2Ez...

🔍 Resposta do webhook - Status: 200
✅ Lead enviado com sucesso
```

Se mostrar status **403**, tente:
1. Adicionar `WEBHOOK_USERNAME=webhook`
2. Verificar se o token está correto
3. Verificar no N8N qual username está esperando

---

## 🎯 Resumo

**Causa:** N8N mudou de Header Token para Basic Auth
**Correção:** Código atualizado para usar `Authorization: Basic`
**Deploy:** Fazer redeploy na Vercel
**Config:** `WEBHOOK_TOKEN` obrigatório, `WEBHOOK_USERNAME` opcional

**Não é necessário alterar o frontend!**
