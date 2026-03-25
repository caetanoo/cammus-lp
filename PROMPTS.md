Me ajude a configurar o deploy correto na Vercel para o 
repositório cammus-lp.

A estrutura atual é:
- Repositório: caetanoo/cammus-lp
- Frontend: Formulario Cammus/forms.html (página principal)
- Backend: backend/server.js (proxy do webhook)
- vercel.json já criado na raiz

O PROBLEMA é que o backend Node.js (backend/server.js) 
não pode rodar na Vercel como está, pois a Vercel é 
serverless e não suporta Express da forma tradicional.

Preciso que você:

1. Converta o backend/server.js para uma Vercel Serverless Function:
   - Criar pasta /api na raiz do projeto
   - Criar arquivo /api/submit-lead.js no formato serverless
   - Manter toda a lógica atual (rate limiting, validações, 
     proxy do webhook, token de segurança)

2. Configurar variáveis de ambiente:
   - Listar quais variáveis do .env precisam ser configuradas 
     no dashboard da Vercel (Settings → Environment Variables)
   - WEBHOOK_URL e WEBHOOK_TOKEN não podem ficar no código

3. Atualizar o vercel.json:
   - Garantir que / aponta para Formulario Cammus/forms.html
   - Garantir que /api/submit-lead aponta para a função serverless
   - Manter os headers de segurança

4. Atualizar forms.html:
   - Garantir que WEBHOOK_URL aponta para /api/submit-lead
   - Funciona tanto em localhost quanto em produção

5. Fazer commit e push para o repositório cammus-lp

Após isso, me diga exatamente quais variáveis de ambiente 
preciso cadastrar no dashboard da Vercel antes de fazer deploy.