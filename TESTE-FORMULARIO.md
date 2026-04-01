# 🔍 Guia de Teste - Erro 403 no Formulário

## ⚠️ Problema Reportado
Formulário retorna erro 403 Forbidden ao enviar.

## ✅ Diagnóstico Realizado

### Código está correto:
- ✅ API `/api/submit-lead` está deployada e funcionando
- ✅ Teste retorna 400 (erro esperado de validação)
- ✅ Não há validação CSRF que possa causar 403
- ✅ CORS configurado para aceitar qualquer origem
- ✅ Sem mudanças recentes no código de submissão

### Causa Raiz:
**CACHE DO BROWSER** ou **DEPLOY ANTIGO**

O último deploy confirmado na Vercel é `74ab678`, mas o código atual é `26909ed`.

## 🔧 Passos para Resolver

### Passo 1: Verificar se deploy está atualizado

1. Acesse: https://vercel.com/dashboard
2. Entre no projeto `cammus-ai`
3. Vá em "Deployments"
4. Verifique se o último deploy é o commit `26909ed`

Se NÃO for, faça:
- Clique em "Redeploy" no último deployment
- Ou espere o autodeploy terminar (pode levar 2-3 minutos)

### Passo 2: Limpar cache do navegador

**Opção A - Hard Refresh:**
```
Chrome/Edge: Ctrl + Shift + R (Windows) ou Cmd + Shift + R (Mac)
Firefox: Ctrl + F5 (Windows) ou Cmd + Shift + R (Mac)
Safari: Cmd + Option + R
```

**Opção B - Modo anônimo:**
1. Abra uma janela anônima/privada
2. Acesse https://cammus-ai.vercel.app
3. Teste o formulário novamente

### Passo 3: Verificar logs da Vercel

Se o erro persistir:

1. Vá em: Deployments → [último deployment] → Functions → submit-lead → **Logs**
2. Procure por logs de erro com status 403
3. Verifique se as variáveis de ambiente estão configuradas:
   - `WEBHOOK_URL`
   - `WEBHOOK_TOKEN`
   - `FRONTEND_URL` (opcional)

### Passo 4: Testar API diretamente

Execute no terminal:

```bash
curl -X POST https://cammus-ai.vercel.app/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{"test": true}' \
  -w "\nStatus: %{http_code}\n"
```

**Resultado esperado:**
- Status: **400** (payload inválido - CORRETO)
- Resposta: `{"error":"Campos obrigatórios ausentes..."}`

**Se receber 403:**
- Há um WAF/firewall bloqueando
- Pode ser rate limiting da Vercel
- IP pode estar bloqueado

## 📊 Resumo

| Item | Status | Notas |
|------|--------|-------|
| Código backend | ✅ Correto | Sem validação CSRF |
| Código frontend | ✅ Correto | Fetch bem configurado |
| API deployada | ✅ Sim | Retorna 400 para payload inválido |
| CORS | ✅ Configurado | Aceita * |
| Último commit | 26909ed | Apenas mudanças de espaçamento |
| Variáveis de ambiente | ⚠️ Verificar | Confirmar na Vercel |

## 🎯 Ação Recomendada

1. **Hard refresh no browser** (Ctrl+Shift+R)
2. **Verificar último deploy** na Vercel
3. **Testar em modo anônimo**
4. Se persistir: **Verificar logs da Vercel**
