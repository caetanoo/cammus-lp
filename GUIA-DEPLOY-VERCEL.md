# 🚀 Guia Completo de Deploy - Vercel

## Passo 1: Configurar Variáveis de Ambiente ⚠️ OBRIGATÓRIO

### 1.1 Acesse o Dashboard da Vercel
- URL: https://vercel.com/dashboard
- Faça login se necessário

### 1.2 Selecione o Projeto
- Clique no projeto: **cammus-ai**

### 1.3 Vá em Settings
- No menu superior, clique em **"Settings"**

### 1.4 Clique em Environment Variables
- No menu lateral esquerdo, clique em **"Environment Variables"**

### 1.5 Adicione as Variáveis (UMA POR VEZ)

**Variável 1: WEBHOOK_URL**
1. Clique em **"Add New"**
2. Name: `WEBHOOK_URL`
3. Value: `https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis`
4. Environment: **Production** (deixe marcado)
5. Clique em **"Save"**

**Variável 2: WEBHOOK_TOKEN**
1. Clique em **"Add New"** novamente
2. Name: `WEBHOOK_TOKEN`
3. Value: `29dd43a31c2419183e0eb7d7b298335050807c5d83fb5c231cf02c3b740e0e1a`
4. Environment: **Production** (deixe marcado)
5. Clique em **"Save"**

**Variável 3: FRONTEND_URL (Opcional)**
1. Clique em **"Add New"** novamente
2. Name: `FRONTEND_URL`
3. Value: `*`
4. Environment: **Production** (deixe marcado)
5. Clique em **"Save"**

### 1.6 Verificar se as Variáveis Foram Salvas

Você deve ver algo assim:

```
Environment Variables (3)

WEBHOOK_URL          Production    •••••••shop/webhook/lead-analysis
WEBHOOK_TOKEN        Production    •••••••••••••••••••••••••••••••••
FRONTEND_URL         Production    *
```

✅ Se você vê as 3 variáveis listadas, está correto!

---

## Passo 2: Fazer Redeploy 🔄

**POR QUE?** As variáveis só são aplicadas em novos deploys.

### 2.1 Vá em Deployments
- Clique na aba **"Deployments"** no topo

### 2.2 Force um Redeploy
1. Encontre o **deployment mais recente** (primeiro da lista)
2. Clique nos **três pontinhos** (⋯) à direita
3. Clique em **"Redeploy"**
4. Na janela que abrir, clique em **"Redeploy"** novamente
5. **Aguarde 1-2 minutos** para o deploy completar

### 2.3 Verifique o Status
- Quando aparecer ✅ **"Ready"**, o deploy está completo

---

## Passo 3: Testar o Formulário 🧪

### 3.1 Copie a URL do Deployment
- Na aba Deployments, clique no deployment que acabou de fazer
- Copie a URL (ex: `https://cammus-ai-xxx.vercel.app`)

### 3.2 Abra no Navegador
- Cole a URL no navegador
- Você deve ver o **formulário de qualificação**

### 3.3 Abra o Console do Navegador
- **Chrome/Edge**: Pressione `F12` ou `Cmd+Option+J` (Mac)
- **Firefox**: Pressione `F12` ou `Cmd+Option+K` (Mac)
- Vá na aba **"Console"**

### 3.4 Preencha e Envie o Formulário
1. Preencha todos os campos
2. Clique em **"Agendar minha call"**
3. **OBSERVE** o que acontece

---

## Passo 4: Identificar o Resultado ✅ ou ❌

### ✅ SUCESSO - Você deve ver:
```
✅ Formulário enviado com sucesso!
(Redirecionando para agendamento...)
```
E ser redirecionado para `/agendamento`

### ❌ ERRO - Você pode ver:

**Erro 1: "Configuração inválida do servidor"**
```
❌ Configuração inválida do servidor (WEBHOOK_URL ausente)
```
**Solução**: Volte ao Passo 1 - as variáveis não foram configuradas

**Erro 2: "Erro ao enviar formulário"**
```
❌ Erro ao enviar formulário: 500
```
**Solução**: Vá para o Passo 5 (Ver Logs)

**Erro 3: "Timeout ao conectar com webhook"**
```
❌ Timeout ao conectar com webhook
```
**Solução**: O webhook N8N está offline ou URL incorreta

**Erro 4: Nada acontece**
- **Solução**: Veja o console do navegador (F12) - haverá uma mensagem de erro

---

## Passo 5: Ver Logs Detalhados (Se der erro) 🔍

### 5.1 Acesse os Logs da Função
1. No dashboard da Vercel, vá em **"Deployments"**
2. Clique no **deployment mais recente**
3. Scroll down até a seção **"Functions"**
4. Clique em **"api/submit-lead.js"**
5. Clique em **"Logs"** ou **"View Function Logs"**

### 5.2 Procure por Erros
Os logs vão mostrar algo como:

**Exemplo de erro - Variável não configurada:**
```
═══════════════════════════════════════════════════════════
🔍 DIAGNÓSTICO - Função serverless chamada
═══════════════════════════════════════════════════════════
Método HTTP: POST
URL: /api/submit-lead

🔍 Verificando variáveis de ambiente...
WEBHOOK_URL definido: false  ← ❌ PROBLEMA AQUI
WEBHOOK_TOKEN definido: false  ← ❌ PROBLEMA AQUI

❌ ERRO: WEBHOOK_URL não definido nas variáveis de ambiente
```

**Exemplo de sucesso:**
```
🔍 Verificando variáveis de ambiente...
WEBHOOK_URL definido: true  ← ✅ OK
WEBHOOK_TOKEN definido: true  ← ✅ OK
FRONTEND_URL: *

✅ Variáveis de ambiente OK

🔍 Validando payload...
Body recebido: { "lead": {...}, "segmentacao": {...}, "qualificacao": {...} }

✅ Payload válido - Email: usuario@example.com

🔍 Enviando para webhook N8N...
Webhook URL: https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis

🔍 Resposta do webhook - Status: 200

✅ Lead enviado com sucesso - Email: usuario@example.com
```

---

## Checklist Final ✅

Antes de testar, confirme:

- [ ] Variáveis WEBHOOK_URL e WEBHOOK_TOKEN configuradas na Vercel
- [ ] Redeploy feito após configurar variáveis
- [ ] Status do deployment: ✅ Ready
- [ ] Formulário abre no navegador
- [ ] Console do navegador aberto (F12)

---

## Problemas Comuns e Soluções 🔧

### Problema: "WEBHOOK_URL ausente"
**Causa**: Variável não configurada ou redeploy não feito
**Solução**:
1. Configurar variável (Passo 1)
2. Fazer redeploy (Passo 2)

### Problema: "Webhook retornou status 404"
**Causa**: URL do webhook N8N incorreta
**Solução**: Verificar URL em Settings → Environment Variables

### Problema: "Webhook retornou status 401"
**Causa**: Token de autenticação inválido
**Solução**: Verificar WEBHOOK_TOKEN em Settings → Environment Variables

### Problema: "Timeout ao conectar com webhook"
**Causa**: Webhook N8N offline ou não acessível
**Solução**: Verificar se https://webhook.dev.sakaguchifutai.shop está online

### Problema: Formulário não envia nada
**Causa**: Erro no JavaScript
**Solução**: Abrir console (F12) e ver mensagem de erro

---

## Precisa de Ajuda? 🆘

Se ainda tiver problemas:

1. **Copie os logs** da função (Passo 5)
2. **Copie o erro** do console do navegador (F12)
3. **Me envie** as informações

Vou conseguir diagnosticar exatamente o problema!

---

## URLs Importantes 🔗

- **Dashboard Vercel**: https://vercel.com/dashboard
- **Seu Projeto**: https://vercel.com/dashboard (clique em cammus-ai)
- **Webhook N8N (Dev)**: https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
- **Documentação Vercel**: https://vercel.com/docs/projects/environment-variables
