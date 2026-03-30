# 🔧 Fix DOMPurify não carregando na Vercel

## ❌ Problema
```
DOMPurify loaded: false
```
Formulário não envia porque DOMPurify é necessário para sanitizar inputs (segurança XSS).

## ✅ Solução: Redeploy na Vercel

### Passo 1: Verificar último commit no GitHub
1. Acesse: https://github.com/caetanoo/cammus-ai
2. Confirme que o último commit é: `cfa9d16 - fix: replace DOMPurify with correct version matching SRI hash`
3. Verifique que o arquivo existe: `assets/dompurify.min.js`

### Passo 2: Fazer Redeploy Manual na Vercel
1. Acesse: https://vercel.com/dashboard
2. Selecione projeto: `cammus-ai`
3. Clique em `Deployments`
4. No deployment mais recente, clique nos 3 pontos (⋮)
5. Clique em `Redeploy`
6. **AGUARDE** o deploy completar (1-2 minutos)

### Passo 3: Verificar Variáveis de Ambiente (CRÍTICO!)
**Enquanto espera o redeploy, VERIFIQUE:**

1. Na Vercel: `Settings` → `Environment Variables`
2. Confirme que existem:
   ```
   WEBHOOK_URL = https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
   WEBHOOK_TOKEN = (seu token de 64 caracteres)
   ```
3. Se NÃO existirem, ADICIONE AGORA:
   - Clique em `Add New`
   - Nome: `WEBHOOK_URL`
   - Value: `https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis`
   - Environment: `Production` ✅
   - Clique em `Save`

   Repita para `WEBHOOK_TOKEN`

4. **Depois de adicionar variáveis, REDEPLOY novamente!**

### Passo 4: Testar após Redeploy
1. Aguarde deploy completar (status: Ready ✅)
2. Acesse: https://cammus-ai.vercel.app/Formulario Cammus/forms.html
3. Abra Console (F12)
4. Deve aparecer:
   ```
   ✅ DOMPurify loaded: true
   ```
5. Preencha e envie formulário
6. Deve redirecionar para `/obrigado`

---

## 🔍 Debug Adicional

Se mesmo após redeploy o DOMPurify não carregar:

### Verificação 1: Arquivo acessível na Vercel?
Teste direto no navegador:
```
https://cammus-ai.vercel.app/assets/dompurify.min.js
```
- ✅ Se carregar → problema está no forms.html
- ❌ Se 404 → arquivo não foi incluído no deploy

### Verificação 2: Console do Navegador
Abra Console (F12) e procure por:
```
❌ Failed to load resource: 404 /assets/dompurify.min.js
❌ SRI integrity check failed
```

Se aparecer erro de SRI:
- O hash do arquivo não bate
- Solução: remover temporariamente o `integrity` do script

### Verificação 3: Fallback CDN
Se o local falhar, o CDN deveria carregar. Se não carregar do CDN:
- Problema de rede
- Ou o código de fallback não está executando

---

## 🚨 Solução Alternativa (Se tudo falhar)

Se DOMPurify continuar não carregando, use versão CDN direto:

Edite `forms.html` e substitua:
```html
<!-- ANTES -->
<script
    src="/assets/dompurify.min.js"
    integrity="sha384-cwS6YdhLI7XS60eoDiC+egV0qHp8zI+Cms46R0nbn8JrmoAzV9uFL60etMZhAnSu"
    crossorigin="anonymous">
</script>

<!-- DEPOIS -->
<script
    src="https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js"
    integrity="sha384-cwS6YdhLI7XS60eoDiC+egV0qHp8zI+Cms46R0nbn8JrmoAzV9uFL60etMZhAnSu"
    crossorigin="anonymous">
</script>
```

---

## ✅ Checklist

Antes de testar novamente:
- [ ] Último commit está no GitHub (cfa9d16)
- [ ] Redeploy foi feito na Vercel
- [ ] Deploy completou com sucesso (Ready ✅)
- [ ] Variáveis WEBHOOK_URL e WEBHOOK_TOKEN configuradas
- [ ] Ambiente selecionado: Production
- [ ] Aguardou 1-2 minutos após redeploy

---

## 📞 Me avise:
1. O redeploy foi feito?
2. DOMPurify agora aparece como "true"?
3. As variáveis de ambiente estão configuradas?
4. Formulário enviou com sucesso?
