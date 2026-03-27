# Session Notes - 2026-03-27

## Resumo da Sessão

Migração completa do backend para Vercel Serverless Functions e correção de erros críticos no formulário de qualificação.

---

## O Que Foi Feito

### 1. Correção de ReferenceError no Submit Handler
**Problema**: Botão "Agendar minha call" não funcionava - `ReferenceError` ao validar nicho.

**Causa**: Objeto `nichos` (dropdown) não estava no escopo do submit handler.

**Solução**:
```javascript
// Expor nichos globalmente
window.nichos = nichos;

// Usar no submit handler
const nichosData = window.nichos || {};
```

**Commit**: `b7fc5dc` - fix: resolve ReferenceError in form submit handler

---

### 2. Migração Backend para Vercel Serverless Functions

**Problema**: Backend Express (`backend/server.js`) não roda na Vercel (plataforma serverless).

**Decisão**: Criar função serverless mantendo backend Express para desenvolvimento local.

**Arquivos Criados**:
- `/api/submit-lead.js` - Vercel serverless function (produção)
- `/api/README.md` - Documentação da API
- `.env.example` - Template de variáveis de ambiente

**Arquivos Mantidos**:
- `backend/server.js` - Backend Express (desenvolvimento local apenas)

**Lógica Mantida**:
- ✅ Proxy de webhook (protege token N8N)
- ✅ Validações de payload
- ✅ Metadata server-side (IP, timestamp, user-agent)
- ✅ CORS configurável
- ✅ Timeout de 15s
- ✅ Tratamento de erros robusto

**Commit**: `b9bc0d4` - feat: migrate backend to Vercel serverless functions

---

### 3. Reorganização da Estrutura de Deploy

**Problema**: Vercel servia `index.html` (landing page) ao invés do formulário.

**Decisão**: Formulário na raiz, landing page em `/landing`.

**Mudanças**:
```
Antes:
/index.html              → Landing page institucional
/Formulario Cammus/      → Formulários

Depois:
/index.html              → Formulário (cópia de forms.html)
/landing/index.html      → Landing page institucional
/Formulario Cammus/      → Formulários originais (mantidos)
```

**Motivo**: Vercel dá prioridade a arquivos estáticos sobre rewrites. Solução mais limpa que redirects.

**Commit**: `db5c616` - refactor: move landing page and set forms as root

---

### 4. Adição de Logs de Diagnóstico

**Problema**: "Erro ao enviar" na Vercel sem logs para diagnosticar.

**Solução**: Logs detalhados em cada etapa da função serverless.

**Logs Adicionados**:
- ✅ Método HTTP, URL, Origin, User-Agent
- ✅ Configuração de CORS
- ✅ Verificação de variáveis de ambiente
- ✅ Payload recebido (JSON completo)
- ✅ Validação de campos obrigatórios
- ✅ Request ao webhook N8N
- ✅ Response do webhook (status, headers)
- ✅ Stack trace detalhado em erros

**Como Ver Logs**:
```
Vercel Dashboard → Deployments → [deployment] →
Functions → submit-lead → Logs
```

**Commit**: `ad064c8` - debug: add comprehensive diagnostic logging to serverless function

---

### 5. Correção de Formato ESM → CommonJS

**Problema**: Warning da Vercel:
```
Node.js functions are compiled from ESM to CommonJS.
```
Função não executava (console vazio).

**Causa**: `export default` (ESM) requer compilação extra pela Vercel.

**Solução**:
```javascript
// Antes (ESM - não funciona):
export default async function handler(req, res) { ... }

// Depois (CommonJS - funciona):
module.exports = async function handler(req, res) { ... }
```

**Commit**: `f42b362` - fix: convert serverless function from ESM to CommonJS

---

## Decisões Importantes

### 1. Dois Backends Paralelos (Desenvolvimento vs Produção)

**Decisão**: Manter `backend/server.js` (Express) + `/api/submit-lead.js` (Serverless).

**Motivo**:
- **Desenvolvimento local**: Express é mais fácil de debugar
- **Produção Vercel**: Serverless é o único formato suportado
- **URL relativa** (`/api/submit-lead`) funciona em ambos

**Como Funciona**:
```bash
# Desenvolvimento
Terminal 1: node backend/server.js        # Porta 3000
Terminal 2: python3 -m http.server 8000   # Porta 8000

# Produção
Vercel: Serverless function em /api/submit-lead
```

---

### 2. URL Relativa no Frontend

**Decisão**: Usar `/api/submit-lead` (relativa) ao invés de URL absoluta.

**Motivo**:
- ✅ Funciona em localhost (proxy para porta 3000)
- ✅ Funciona em produção (serverless function)
- ✅ Sem necessidade de variável de ambiente no frontend

---

### 3. CommonJS ao Invés de ESM

**Decisão**: Usar `module.exports` ao invés de `export default`.

**Motivo**:
- ✅ Vercel executa diretamente sem compilação
- ✅ Elimina warnings de build
- ✅ Logs aparecem corretamente

---

## Problemas Encontrados e Soluções

### Problema 1: ReferenceError em Validação de Nicho
**Erro**: `nichos is not defined`
**Solução**: `window.nichos = nichos` no dropdown, `window.nichos || {}` no submit

---

### Problema 2: Backend Express Não Roda na Vercel
**Erro**: Express requer servidor long-running, Vercel é serverless
**Solução**: Criar `/api/submit-lead.js` como serverless function

---

### Problema 3: Index.html Sobrepõe Rewrites
**Erro**: Vercel serve index.html ignorando `vercel.json` rewrites
**Solução**: Mover landing page, copiar formulário para raiz

---

### Problema 4: Função Serverless Não Executa
**Erro**: Warning "compiled from ESM to CommonJS", logs vazios
**Solução**: Mudar `export default` para `module.exports`

---

## O Que Ficou Pendente

### 1. Configurar Variáveis de Ambiente na Vercel ⚠️ OBRIGATÓRIO

**Ação Necessária**:
```
Vercel Dashboard → Settings → Environment Variables → Add New:

Nome              Valor
────────────────────────────────────────────────────────────
WEBHOOK_URL       https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
WEBHOOK_TOKEN     29dd43a31c2419183e0eb7d7b298335050807c5d83fb5c231cf02c3b740e0e1a
FRONTEND_URL      * (ou domínio específico)
```

**Após configurar**: Fazer redeploy manual.

---

### 2. Testar Formulário em Produção

**Checklist**:
- [ ] Variáveis de ambiente configuradas
- [ ] Redeploy feito
- [ ] Formulário abre em `/` (raiz)
- [ ] Submit funciona e redireciona para `/agendamento`
- [ ] Logs aparecem na Vercel (Functions → submit-lead → Logs)

---

### 3. Rate Limiting Server-Side (Opcional)

**Atualmente**: Apenas client-side (3 req/hora via localStorage).

**Para Produção**: Implementar com Upstash Redis.

**Documentação**: `api/README.md` (seção Rate Limiting).

---

## Próximos Passos Recomendados

### Curto Prazo (Obrigatório)

1. **Configurar variáveis na Vercel**
   - Sem isso, formulário retorna erro 500

2. **Testar submissão end-to-end**
   - Formulário → Webhook N8N → Confirmação

3. **Verificar logs da Vercel**
   - Confirmar que logs de diagnóstico aparecem
   - Identificar qualquer erro do webhook N8N

---

### Médio Prazo (Recomendado)

4. **Implementar rate limiting server-side**
   - Usar Upstash Redis
   - Proteger contra abuso da API

5. **Configurar domínio customizado**
   - Ao invés de `cammus-ai-xxx.vercel.app`
   - Usar `app.cammus.com.br` ou similar

6. **Monitorar erros em produção**
   - Vercel Analytics
   - Sentry ou similar para error tracking

---

### Longo Prazo (Melhorias)

7. **Adicionar testes automatizados**
   - Testar função serverless
   - Testar validações de formulário

8. **Otimizar performance**
   - Lazy loading de scripts
   - Minificação de HTML/CSS

9. **Migrar para TypeScript**
   - Type safety na função serverless
   - Melhores intellisense

---

## Comandos Importantes

### Desenvolvimento Local

```bash
# Backend
cd backend
node server.js

# Frontend
python3 -m http.server 8000

# Testar API localmente
node test-api.js
```

### Deploy Vercel

```bash
# Push para GitHub (auto-deploy)
git push cammus-ai main

# Forçar redeploy manual
vercel --prod

# Ver logs em tempo real
vercel logs https://seu-dominio.vercel.app
```

---

## Arquivos Importantes Criados/Modificados

### Criados
- `/api/submit-lead.js` - Serverless function
- `/api/README.md` - Documentação da API
- `.env.example` - Template de variáveis
- `test-api.js` - Script de teste da API
- `GUIA-DEPLOY-VERCEL.md` - Guia passo a passo

### Modificados
- `vercel.json` - Configuração de functions e rewrites
- `index.html` - Agora é o formulário (cópia de forms.html)
- `Formulario Cammus/forms.html` - Fix de ReferenceError

### Movidos
- `index.html` → `landing/index.html` (landing page original)

---

## Métricas da Sessão

- **Commits**: 6
- **Arquivos criados**: 5
- **Bugs corrigidos**: 4 (ReferenceError, ESM format, structure, scope)
- **Repositório**: `git@github.com:caetanoo/cammus-ai.git`
- **Tempo estimado**: ~2h30min

---

## Notas Técnicas

### Vercel Serverless Functions

- **Formato correto**: `module.exports = async (req, res) => {}`
- **Timeout máximo**: 30s (configurado no vercel.json)
- **Memory**: 1024MB (configurado no vercel.json)
- **Variáveis de ambiente**: Configurar no dashboard (não no código)

### CORS

- **Origem permitida**: `*` (wildcard) ou domínio específico
- **Preflight**: Função precisa responder a OPTIONS requests
- **Headers**: Access-Control-Allow-Origin, Methods, Headers

### Diagnóstico de Erros

1. **Console do navegador** (F12) - Erros do frontend
2. **Logs da Vercel** - Erros da serverless function
3. **Script de teste** (`test-api.js`) - Testar API isoladamente

---

**Última atualização**: 2026-03-27
**Próxima sessão**: Configurar variáveis de ambiente e testar em produção
