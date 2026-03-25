// ═══════════════════════════════════════════════════════════
// CAMMUS BACKEND PROXY - VERCEL SERVERLESS FUNCTION
// Protege o token de webhook do N8N, impedindo exposição no frontend
// ═══════════════════════════════════════════════════════════

/**
 * Vercel Serverless Function para processar submissões de leads
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
    // ═══════════════════════════════════════════════════════════
    // CORS HEADERS
    // ═══════════════════════════════════════════════════════════
    const allowedOrigins = process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(',')
        : ['*'];

    const origin = req.headers.origin;

    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ═══════════════════════════════════════════════════════════
    // VALIDAR MÉTODO HTTP
    // ═══════════════════════════════════════════════════════════
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Método não permitido. Use POST.'
        });
    }

    // ═══════════════════════════════════════════════════════════
    // VALIDAÇÃO DE CONFIGURAÇÃO
    // ═══════════════════════════════════════════════════════════
    if (!process.env.WEBHOOK_TOKEN) {
        console.error('❌ ERRO: WEBHOOK_TOKEN não definido nas variáveis de ambiente');
        return res.status(500).json({
            error: 'Configuração inválida do servidor'
        });
    }

    if (!process.env.WEBHOOK_URL) {
        console.error('❌ ERRO: WEBHOOK_URL não definido nas variáveis de ambiente');
        return res.status(500).json({
            error: 'Configuração inválida do servidor'
        });
    }

    try {
        // ═══════════════════════════════════════════════════════════
        // 1. VALIDAR PAYLOAD
        // ═══════════════════════════════════════════════════════════
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Payload vazio'
            });
        }

        const { lead, segmentacao, qualificacao } = req.body;

        if (!lead || !segmentacao || !qualificacao) {
            return res.status(400).json({
                error: 'Campos obrigatórios ausentes (lead, segmentacao, qualificacao)'
            });
        }

        // ═══════════════════════════════════════════════════════════
        // 2. ADICIONAR METADATA SERVER-SIDE
        // ═══════════════════════════════════════════════════════════
        const clientIP = req.headers['x-forwarded-for'] ||
                         req.headers['x-real-ip'] ||
                         req.socket?.remoteAddress ||
                         'unknown';

        const enrichedPayload = {
            ...req.body,
            metadata: {
                ...(req.body.metadata || {}),
                client_ip: clientIP,
                server_timestamp: new Date().toISOString(),
                user_agent: req.headers['user-agent'] || 'unknown'
            }
        };

        // ═══════════════════════════════════════════════════════════
        // 3. FAZER REQUISIÇÃO AO WEBHOOK N8N
        // ═══════════════════════════════════════════════════════════
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const webhookResponse = await fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Webhook-Token': process.env.WEBHOOK_TOKEN // ← Token protegido (server-side)
            },
            body: JSON.stringify(enrichedPayload),
            signal: controller.signal
        });

        clearTimeout(timeout);

        // ═══════════════════════════════════════════════════════════
        // 4. PROCESSAR RESPOSTA DO WEBHOOK
        // ═══════════════════════════════════════════════════════════
        if (!webhookResponse.ok) {
            console.error(`❌ Webhook retornou status ${webhookResponse.status}`);

            // Tentar extrair mensagem de erro do webhook
            let errorMessage = `Erro no webhook: ${webhookResponse.status}`;
            try {
                const errorData = await webhookResponse.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // Ignorar erro ao parsear JSON de erro
            }

            return res.status(webhookResponse.status).json({
                error: errorMessage
            });
        }

        // ═══════════════════════════════════════════════════════════
        // 5. RETORNAR SUCESSO
        // ═══════════════════════════════════════════════════════════
        const data = await webhookResponse.json();

        console.log(`✅ Lead enviado com sucesso - Email: ${lead.email}, IP: ${clientIP}`);

        return res.status(200).json(data);

    } catch (error) {
        // ═══════════════════════════════════════════════════════════
        // TRATAMENTO DE ERROS
        // ═══════════════════════════════════════════════════════════
        console.error('❌ Erro ao processar requisição:', error.message);

        // Erro de timeout
        if (error.name === 'AbortError') {
            return res.status(504).json({
                error: 'Timeout ao conectar com webhook'
            });
        }

        // Erro de rede
        if (error.message?.includes('fetch') || error.message?.includes('ECONNREFUSED')) {
            return res.status(503).json({
                error: 'Serviço temporariamente indisponível'
            });
        }

        // Erro genérico
        return res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
}

// ═══════════════════════════════════════════════════════════
// NOTAS SOBRE RATE LIMITING
// ═══════════════════════════════════════════════════════════
//
// A Vercel Serverless Functions não mantém estado entre invocações.
// Para implementar rate limiting server-side, você tem 3 opções:
//
// 1. UPSTASH REDIS (Recomendado para produção)
//    - Instalar: npm install @upstash/redis @upstash/ratelimit
//    - Configurar UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN
//    - Implementar rate limiting por IP
//
// 2. VERCEL EDGE CONFIG (Limitado)
//    - Configurar no dashboard da Vercel
//    - Limitações de storage e performance
//
// 3. CONFIAR NO RATE LIMITING DO FRONTEND (Atual)
//    - forms.html já implementa 3 requisições/hora por cliente
//    - Suficiente para MVP, mas não impede ataques diretos à API
//
// Se quiser implementar rate limiting server-side com Upstash:
// https://upstash.com/docs/redis/features/ratelimiting
//
// ═══════════════════════════════════════════════════════════
