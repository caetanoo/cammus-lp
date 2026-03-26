O formulário está dando "Erro ao enviar" na Vercel em produção.

Preciso que você diagnostique e corrija o problema:

1. Verifique se o arquivo /api/submit-lead.js existe e está 
   no formato correto de Vercel Serverless Function

2. Verifique o vercel.json se está roteando corretamente 
   para a função serverless

3. Verifique em forms.html qual URL está sendo chamada 
   no fetch do submit — deve ser /api/submit-lead

4. Verifique se as variáveis de ambiente estão sendo 
   lidas corretamente com process.env.WEBHOOK_URL 
   e process.env.WEBHOOK_TOKEN

5. Adicione um log de diagnóstico na função serverless 
   para identificar onde está falhando:
   - A função está sendo chamada?
   - As variáveis de ambiente estão definidas?
   - O webhook externo está respondendo?

6. Verifique o CORS — a função serverless precisa aceitar 
   requisições do domínio da Vercel

Após o diagnóstico, me diga:
- Qual é o erro exato que aparece nos logs da Vercel?
- A função /api/submit-lead está sendo encontrada?
- As variáveis WEBHOOK_URL e WEBHOOK_TOKEN estão 
  cadastradas no dashboard da Vercel?

Para ver os logs de erro reais:
Vercel Dashboard → seu projeto → Deployments → 
clique no deployment → Functions → submit-lead → Logs