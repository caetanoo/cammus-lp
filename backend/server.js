// ═══════════════════════════════════════════════════════════
// CAMMUS BACKEND PROXY
// Protege o token de webhook do N8N, impedindo exposição no frontend
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════

// CORS: permitir requisições do frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Em produção, definir URL específico
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

// Parse JSON bodies
app.use(express.json({ limit: '1mb' }));

// Logging de requisições (apenas em desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
}

// ═══════════════════════════════════════════════════════════
// VALIDAÇÃO DE CONFIGURAÇÃO
// ═══════════════════════════════════════════════════════════

if (!process.env.WEBHOOK_TOKEN) {
    console.error('❌ ERRO: WEBHOOK_TOKEN não definido no arquivo .env');
    process.exit(1);
}

if (!process.env.WEBHOOK_URL) {
    console.error('❌ ERRO: WEBHOOK_URL não definido no arquivo .env');
    process.exit(1);
}

// ═══════════════════════════════════════════════════════════
// ENDPOINT: /api/submit-lead
// Proxy que adiciona o token de autenticação server-side
// ═══════════════════════════════════════════════════════════

app.post('/api/submit-lead', async (req, res) => {
    try {
        // 1. Validar que o payload não está vazio
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Payload vazio'
            });
        }

        // 2. Validar campos obrigatórios básicos
        const { lead, segmentacao, qualificacao } = req.body;
        if (!lead || !segmentacao || !qualificacao) {
            return res.status(400).json({
                error: 'Campos obrigatórios ausentes (lead, segmentacao, qualificacao)'
            });
        }

        // 3. Adicionar IP do cliente ao metadata (para tracking server-side)
        const clientIP = req.headers['x-forwarded-for'] ||
                         req.headers['x-real-ip'] ||
                         req.socket.remoteAddress;

        if (!req.body.metadata) {
            req.body.metadata = {};
        }
        req.body.metadata.client_ip = clientIP;
        req.body.metadata.server_timestamp = new Date().toISOString();

        // 4. Fazer requisição ao webhook N8N com token protegido
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const response = await fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Webhook-Token': process.env.WEBHOOK_TOKEN // ← Token adicionado aqui (server-side)
            },
            body: JSON.stringify(req.body),
            signal: controller.signal
        });

        clearTimeout(timeout);

        // 5. Verificar se webhook respondeu com sucesso
        if (!response.ok) {
            console.error(`❌ Webhook retornou status ${response.status}`);
            return res.status(response.status).json({
                error: `Erro no webhook: ${response.status}`
            });
        }

        // 6. Retornar resposta do webhook ao frontend
        const data = await response.json();
        console.log(`✅ Lead enviado com sucesso - Email: ${lead.email}`);

        return res.json(data);

    } catch (error) {
        // Tratamento de erros
        console.error('❌ Erro ao processar requisição:', error.message);

        // Erro de timeout
        if (error.name === 'AbortError') {
            return res.status(504).json({
                error: 'Timeout ao conectar com webhook'
            });
        }

        // Erro de rede
        if (error.message.includes('fetch') || error.message.includes('ECONNREFUSED')) {
            return res.status(503).json({
                error: 'Serviço temporariamente indisponível'
            });
        }

        // Erro genérico
        return res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

// ═══════════════════════════════════════════════════════════
// HEALTH CHECK
// ═══════════════════════════════════════════════════════════

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        webhook_configured: !!process.env.WEBHOOK_URL
    });
});

// ═══════════════════════════════════════════════════════════
// 404 HANDLER
// ═══════════════════════════════════════════════════════════

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado' });
});

// ═══════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════

app.listen(PORT, () => {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  CAMMUS BACKEND PROXY');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`✅ Webhook URL: ${process.env.WEBHOOK_URL}`);
    console.log(`✅ Token protegido: ${process.env.WEBHOOK_TOKEN ? '***' + process.env.WEBHOOK_TOKEN.slice(-8) : 'NÃO CONFIGURADO'}`);
    console.log(`✅ Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log('═══════════════════════════════════════════════════════════');
});
