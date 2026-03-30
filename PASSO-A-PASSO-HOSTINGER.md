# 🚀 Passo-a-Passo: Deploy na Hostinger

## 📋 Antes de Começar

Você precisa:
- ✅ Acesso ao painel da Hostinger (hPanel)
- ✅ Domínio configurado (ou usar subdomínio temporário)
- ✅ Credenciais do webhook N8N (URL + Token)

---

## 🎯 OPÇÃO 1: Hostinger com Backend na Vercel (RECOMENDADO)

### Vantagens
- ✅ Mais simples
- ✅ Funciona em qualquer plano da Hostinger
- ✅ Backend já está configurado na Vercel

### Passo 1: Configurar Variáveis de Ambiente na Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione: `cammus-ai`
3. Vá em: `Settings` → `Environment Variables`
4. Adicione:
   ```
   WEBHOOK_URL = https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
   WEBHOOK_TOKEN = (seu token de 64 caracteres)
   FRONTEND_URL = https://seudominio.com.br
   ```
5. Selecione ambiente: `Production`
6. Clique em `Save`
7. Vá em `Deployments` → Redeploy

### Passo 2: Atualizar config-api.js

Edite o arquivo `/Formulario Cammus/config-api.js`:

```javascript
const API_CONFIG = {
    ambiente: 'vercel',  // ← Manter como 'vercel'
    endpoints: {
        vercel: 'https://cammus-ai.vercel.app/api/submit-lead',  // ← URL da Vercel
        // ...
    }
};
```

### Passo 3: Upload para Hostinger via FTP

**Opção A: File Manager (navegador)**
1. Acesse hPanel → File Manager
2. Navegue até `public_html/`
3. Delete o conteúdo antigo (se houver)
4. Upload dos arquivos:
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── dompurify.min.js
   │   ├── scroll-animations.js
   │   └── fix-classes.css
   ├── Formulario Cammus/
   │   ├── forms.html
   │   ├── agendamento.html
   │   ├── obrigado.html
   │   └── config-api.js
   └── design-system/
       └── design-system.html
   ```

**Opção B: FTP (FileZilla/WinSCP)**
1. Configure FTP:
   - Host: `ftp.seudominio.com.br`
   - Username: (seu username da Hostinger)
   - Password: (sua senha)
   - Port: 21
2. Conecte e faça upload para `/public_html/`

### Passo 4: Testar

1. Acesse: `https://seudominio.com.br/Formulario Cammus/forms.html`
2. Preencha e envie o formulário
3. Verifique:
   - ✅ Console do navegador (F12) sem erros
   - ✅ Webhook N8N recebeu os dados
   - ✅ Redirecionou para `/obrigado`

---

## 🎯 OPÇÃO 2: Tudo na Hostinger (com PHP Proxy)

### Vantagens
- ✅ Sem dependência da Vercel
- ✅ Tudo em um lugar só
- ✅ Funciona em plano básico

### Passo 1: Configurar api/submit-form.php

Edite o arquivo `/api/submit-form.php`:

```php
define('WEBHOOK_URL', 'https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis');
define('WEBHOOK_TOKEN', 'SEU_TOKEN_REAL_AQUI'); // ⚠️ TROCAR
define('FRONTEND_URL', 'https://seudominio.com.br'); // ou '*'
```

**IMPORTANTE:** Por segurança, mova as credenciais para fora de `public_html/`:

1. Crie `/config.php` (fora de public_html)
2. Mova as credenciais para lá
3. Em `submit-form.php`, adicione no início:
   ```php
   require_once(__DIR__ . '/../../config.php');
   ```

### Passo 2: Atualizar config-api.js

```javascript
const API_CONFIG = {
    ambiente: 'hostinger-php',  // ← Trocar para 'hostinger-php'
    // ...
};
```

### Passo 3: Upload para Hostinger

Upload dos arquivos (incluindo `/api/submit-form.php`):
```
public_html/
├── index.html
├── api/
│   └── submit-form.php  ← Novo arquivo PHP
├── assets/
├── Formulario Cammus/
│   ├── forms.html
│   └── config-api.js
└── design-system/
```

### Passo 4: Testar

1. Acesse: `https://seudominio.com.br/Formulario Cammus/forms.html`
2. Abra console (F12) → Network
3. Envie o formulário
4. Verifique:
   - ✅ POST `/api/submit-form.php` retornou 200
   - ✅ Webhook N8N recebeu os dados

---

## 🆘 Solução de Problemas

### Erro 404 em /api/submit-form.php

**Causa:** Arquivo não foi enviado ou está no diretório errado

**Solução:**
1. Verifique que `/api/submit-form.php` existe em `public_html/api/`
2. Permissões do arquivo: `644` (rw-r--r--)

### Erro 500 Internal Server Error

**Causa:** Erro de PHP (sintaxe ou configuração)

**Solução:**
1. Acesse hPanel → Error Logs
2. Veja o erro específico
3. Verifique se as constantes estão definidas:
   ```php
   define('WEBHOOK_TOKEN', 'token-real');  // Não pode estar vazio
   ```

### CORS Error (Access-Control-Allow-Origin)

**Causa:** `FRONTEND_URL` não está configurado corretamente

**Solução:**
Edite `submit-form.php`:
```php
define('FRONTEND_URL', 'https://seudominio.com.br');
// ou use '*' para permitir qualquer origem (menos seguro)
define('FRONTEND_URL', '*');
```

### Formulário não envia (nada acontece)

**Causa:** `config-api.js` não está configurado corretamente

**Solução:**
1. Abra console (F12)
2. Digite: `window.CAMMUS_API`
3. Verifique se `WEBHOOK_URL` está correto
4. Edite `config-api.js` e mude o `ambiente`

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

### Opção 1 (Vercel backend):
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] `config-api.js` com `ambiente: 'vercel'`
- [ ] Arquivos enviados para Hostinger
- [ ] Formulário testado e funcionando
- [ ] Webhook N8N recebendo leads

### Opção 2 (PHP backend):
- [ ] `api/submit-form.php` configurado com token real
- [ ] Credenciais movidas para fora de `public_html` (segurança)
- [ ] `config-api.js` com `ambiente: 'hostinger-php'`
- [ ] Arquivos enviados para Hostinger
- [ ] Logs de erro do PHP verificados (sem erros)
- [ ] Formulário testado e funcionando
- [ ] Webhook N8N recebendo leads

---

## 📞 Próximos Passos

**Depois que escolher uma opção, me avise:**
1. Qual opção você escolheu?
2. Em qual etapa você está?
3. Encontrou algum erro?

Vou te ajudar em cada passo! 🚀
