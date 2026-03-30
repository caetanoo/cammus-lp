# Guia de Deploy na Hostinger

## 🎯 Opções de Hospedagem

### ✅ Opção 1: Hostinger HTML Estático + Backend Vercel (RECOMENDADO)

**Melhor para:** Qualquer plano da Hostinger (Shared, Business, etc.)

**Como funciona:**
- Frontend (HTML/CSS/JS) → Hostinger
- Backend (API `/api/submit-lead`) → Vercel (continua lá)

**Vantagens:**
- ✅ Funciona em qualquer plano
- ✅ Mais simples de configurar
- ✅ Backend já está pronto na Vercel
- ✅ Sem necessidade de PHP ou Node.js

**Passos:**

1. **Configurar variáveis de ambiente na Vercel**
   ```
   Dashboard Vercel → cammus-ai → Settings → Environment Variables

   Adicionar:
   WEBHOOK_URL = https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
   WEBHOOK_TOKEN = (seu token)
   FRONTEND_URL = https://seudominio.com.br
   ```

2. **Atualizar URL da API no forms.html**
   ```javascript
   // Trocar de:
   const WEBHOOK_URL = '/api/submit-lead';

   // Para:
   const WEBHOOK_URL = 'https://cammus-ai.vercel.app/api/submit-lead';
   ```

3. **Upload para Hostinger**
   - Conecte via FTP ou File Manager
   - Envie os arquivos para `public_html/`:
     ```
     public_html/
     ├── index.html
     ├── Formulario Cammus/
     │   ├── forms.html
     │   ├── agendamento.html
     │   └── obrigado.html
     ├── assets/
     │   └── dompurify.min.js
     └── design-system/
         └── design-system.html
     ```

4. **Configurar domínio**
   - Configure seu domínio na Hostinger
   - Acesse: https://seudominio.com.br

---

### ✅ Opção 2: Hostinger com PHP Proxy

**Melhor para:** Se você quer backend 100% na Hostinger

**Como funciona:**
- Frontend (HTML) → Hostinger
- Backend (PHP proxy) → Hostinger
- PHP faz proxy para o webhook N8N

**Passos:**

1. **Criar arquivo PHP proxy** (`api/submit-form.php`)

2. **Atualizar forms.html para usar PHP**
   ```javascript
   const WEBHOOK_URL = '/api/submit-form.php';
   ```

3. **Upload para Hostinger**

Vou criar os arquivos PHP necessários se você escolher esta opção.

---

### ✅ Opção 3: Hostinger VPS com Node.js

**Melhor para:** Se você tem plano VPS ou Business com Node.js

**Como funciona:**
- Frontend + Backend completo na Hostinger
- Node.js rodando o Express server

**Requisitos:**
- Plano Business Hosting ou VPS
- SSH access
- Node.js instalado

**Passos:**
1. SSH na Hostinger
2. Clone o repositório
3. Configure `.env`
4. Rode `npm install` e `npm start`
5. Configure proxy reverso (Nginx/Apache)

---

## 🎯 Qual Opção Escolher?

| Situação | Opção Recomendada |
|----------|-------------------|
| Plano básico (Shared Hosting) | **Opção 1** (HTML + Vercel) |
| Quer tudo na Hostinger mas não tem Node.js | **Opção 2** (PHP Proxy) |
| Tem VPS ou plano com Node.js | **Opção 3** (Node.js completo) |
| Não sabe qual plano tem | **Opção 1** (mais simples) |

---

## 📋 Checklist Antes de Começar

- [ ] Descobrir qual plano da Hostinger você tem
- [ ] Acesso ao painel da Hostinger (File Manager ou FTP)
- [ ] Domínio configurado (ou usar subdomínio da Hostinger)
- [ ] Ter as credenciais do webhook N8N em mãos

---

## 🆘 Precisa de Ajuda?

Me diga:
1. Qual plano da Hostinger você tem?
2. Você quer manter o backend na Vercel ou migrar tudo para Hostinger?
3. Você tem acesso SSH à Hostinger?

Com essas informações, vou te dar o passo-a-passo exato! 🚀
