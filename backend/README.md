# Cammus Backend Proxy

Backend Node.js que protege o token de autenticação do webhook N8N.

## 🔒 Segurança

O token de webhook **NUNCA** deve ser exposto no frontend. Este backend atua como proxy:

1. Frontend envia dados para `/api/submit-lead` (sem token)
2. Backend adiciona o token server-side
3. Backend encaminha para o webhook N8N

## 📦 Instalação

```bash
cd backend

# Instalar dependências
npm install

# Copiar template de configuração
cp .env.example .env

# Editar .env e preencher com valores reais
# WEBHOOK_TOKEN=seu_token_aqui
# WEBHOOK_URL=https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
```

## 🚀 Execução

### Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

### Produção

```bash
NODE_ENV=production npm start
```

## 🔍 Endpoints

### POST `/api/submit-lead`

Recebe dados do formulário e encaminha ao webhook N8N.

**Request:**
```json
{
  "lead": {
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "empresa": "Empresa XYZ",
    "whatsapp": "+55 11 99999-9999"
  },
  "segmentacao": {
    "nicho": "tecnologia",
    "subnicho": "Desenvolvimento de software"
  },
  "qualificacao": {
    "faturamento": "100k-500k",
    "equipe": "interno-sem-resultado",
    "momento": "breve"
  },
  "metadata": {
    "origin": "flux-aurora-form",
    "timestamp": "2026-03-24T10:30:00.000Z"
  }
}
```

**Response (sucesso):**
```json
{
  "status": "success",
  "message": "Lead recebido"
}
```

**Response (erro):**
```json
{
  "error": "Descrição do erro"
}
```

### GET `/health`

Verifica status do servidor.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-24T10:30:00.000Z",
  "webhook_configured": true
}
```

## 🔧 Configuração de Produção

### Variáveis de Ambiente

- `WEBHOOK_TOKEN`: Token de autenticação do N8N (obrigatório)
- `WEBHOOK_URL`: URL do webhook N8N (obrigatório)
- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente (development ou production)
- `FRONTEND_URL`: URL do frontend para CORS (padrão: *)

### CORS

Em **produção**, configure `FRONTEND_URL` com o domínio específico:

```env
FRONTEND_URL=https://cammus.com.br
```

### Deploy (exemplo com PM2)

```bash
# Instalar PM2
npm install -g pm2

# Iniciar servidor
pm2 start server.js --name cammus-backend

# Visualizar logs
pm2 logs cammus-backend

# Reiniciar
pm2 restart cammus-backend
```

## 📝 Logs

Logs são escritos no console:

- `✅ Lead enviado com sucesso`: Formulário processado corretamente
- `❌ Webhook retornou status XXX`: Erro no webhook N8N
- `❌ Erro ao processar requisição`: Erro interno

## ⚠️ Importante

- **NUNCA** commite o arquivo `.env` no Git
- `.env` já está listado no `.gitignore`
- Use `.env.example` como template para novos ambientes
