# API - Vercel Serverless Functions

Esta pasta contém as funções serverless que rodam na Vercel para processar requisições do frontend.

## Estrutura

```
api/
└── submit-lead.js    → Processa submissões de leads (POST /api/submit-lead)
```

## Como Funciona

### Desenvolvimento Local

Para testar localmente, você tem duas opções:

**Opção 1: Usar o backend Express tradicional** (Recomendado)
```bash
# Terminal 1: Backend
cd backend
node server.js

# Terminal 2: Frontend
python3 -m http.server 8000
```

**Opção 2: Usar Vercel CLI**
```bash
npm install -g vercel
vercel dev
```

### Produção (Vercel)

A Vercel detecta automaticamente arquivos em `/api/` e os trata como serverless functions.

- **URL em produção**: `https://seu-dominio.vercel.app/api/submit-lead`
- **Método HTTP**: `POST`
- **Content-Type**: `application/json`

## Endpoint: POST /api/submit-lead

### Request

```json
{
  "lead": {
    "nome": "João Silva",
    "email": "joao@empresa.com",
    "telefone": "+55 11 99999-9999",
    "cargo": "CEO",
    "empresa": "Empresa XYZ"
  },
  "segmentacao": {
    "nicho": "Tecnologia",
    "tamanho": "Médio porte"
  },
  "qualificacao": {
    "desafio": "Gerar leads qualificados",
    "investimento": "R$ 5.000-R$ 10.000/mês"
  }
}
```

### Response (Sucesso)

```json
{
  "success": true,
  "message": "Lead recebido com sucesso"
}
```

### Response (Erro)

```json
{
  "error": "Descrição do erro"
}
```

### Status Codes

- `200` - Sucesso
- `400` - Payload inválido ou campos obrigatórios ausentes
- `405` - Método HTTP não permitido (use POST)
- `429` - Rate limit excedido (se implementado)
- `500` - Erro interno do servidor
- `503` - Serviço temporariamente indisponível
- `504` - Timeout ao conectar com webhook

## Variáveis de Ambiente Obrigatórias

Configure no dashboard da Vercel (Settings → Environment Variables):

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `WEBHOOK_URL` | URL do webhook N8N | `https://n8n.seudominio.com/webhook/abc123` |
| `WEBHOOK_TOKEN` | Token de autenticação do webhook | `seu-token-secreto-aqui` |
| `FRONTEND_URL` | Domínio do frontend (CORS) | `https://cammus.com.br` ou `*` |

## Segurança

### Implementado

- ✅ Token de autenticação protegido (server-side)
- ✅ Validação de payload e campos obrigatórios
- ✅ CORS configurável
- ✅ Timeout de 15 segundos em requisições ao webhook
- ✅ Metadata enriquecida (IP, timestamp, user-agent)
- ✅ Tratamento de erros robusto
- ✅ Logs estruturados

### Rate Limiting (Opcional)

Por padrão, confia no rate limiting do frontend (3 req/hora por cliente).

Para implementar rate limiting server-side, use **Upstash Redis**:

```bash
npm install @upstash/redis @upstash/ratelimit
```

Configure no dashboard da Vercel:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Documentação: https://upstash.com/docs/redis/features/ratelimiting

## Troubleshooting

### Erro: "WEBHOOK_URL não definido"

Configure a variável de ambiente no dashboard da Vercel.

### Erro: "Timeout ao conectar com webhook"

- Verifique se a URL do webhook está correta
- Verifique se o N8N está acessível publicamente
- Timeout padrão: 15 segundos

### Erro: "CORS blocked"

Configure `FRONTEND_URL` com o domínio do frontend ou use `*` para permitir qualquer origem (não recomendado em produção).

## Logs

Em produção, visualize logs em tempo real:

```bash
vercel logs https://seu-dominio.vercel.app
```

Ou no dashboard da Vercel: Deployments → View Function Logs
