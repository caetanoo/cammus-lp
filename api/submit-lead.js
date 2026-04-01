// ═══════════════════════════════════════════════════════════
// CAMMUS BACKEND PROXY - VERCEL SERVERLESS FUNCTION
// Protege o token de webhook do N8N, impedindo exposição no frontend
// ═══════════════════════════════════════════════════════════

/**
 * Vercel Serverless Function para processar submissões de leads
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async function handler(req, res) {
    // ═══════════════════════════════════════════════════════════
    // 🔍 DIAGNÓSTICO INICIAL
    // ═══════════════════════════════════════════════════════════
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔍 DIAGNÓSTICO - Função serverless chamada');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Método HTTP:', req.method);
    console.log('URL:', req.url);
    console.log('Origin:', req.headers.origin || 'não definido');
    console.log('User-Agent:', req.headers['user-agent'] || 'não definido');
    console.log('Content-Type:', req.headers['content-type'] || 'não definido');

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

    console.log('CORS configurado:', {
        allowedOrigins,
        origin,
        header: res.getHeader('Access-Control-Allow-Origin')
    });

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        console.log('✅ Preflight OPTIONS request - respondendo 200');
        return res.status(200).end();
    }

    // ═══════════════════════════════════════════════════════════
    // VALIDAR MÉTODO HTTP
    // ═══════════════════════════════════════════════════════════
    if (req.method !== 'POST') {
        console.error('❌ Método não permitido:', req.method);
        return res.status(405).json({
            error: 'Método não permitido. Use POST.'
        });
    }

    // ═══════════════════════════════════════════════════════════
    // VALIDAÇÃO DE CONFIGURAÇÃO
    // ═══════════════════════════════════════════════════════════
    console.log('🔍 Verificando variáveis de ambiente...');
    console.log('WEBHOOK_URL definido:', !!process.env.WEBHOOK_URL);
    console.log('WEBHOOK_TOKEN definido:', !!process.env.WEBHOOK_TOKEN);
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'não definido (usando *)');

    if (!process.env.WEBHOOK_TOKEN) {
        console.error('❌ ERRO: WEBHOOK_TOKEN não definido nas variáveis de ambiente');
        return res.status(500).json({
            error: 'Configuração inválida do servidor (WEBHOOK_TOKEN ausente)'
        });
    }

    if (!process.env.WEBHOOK_URL) {
        console.error('❌ ERRO: WEBHOOK_URL não definido nas variáveis de ambiente');
        return res.status(500).json({
            error: 'Configuração inválida do servidor (WEBHOOK_URL ausente)'
        });
    }

    console.log('✅ Variáveis de ambiente OK');

    try {
        // ═══════════════════════════════════════════════════════════
        // 1. VALIDAR PAYLOAD
        // ═══════════════════════════════════════════════════════════
        console.log('🔍 Validando payload...');
        console.log('Body recebido:', JSON.stringify(req.body, null, 2));

        if (!req.body || Object.keys(req.body).length === 0) {
            console.error('❌ Payload vazio');
            return res.status(400).json({
                error: 'Payload vazio'
            });
        }

        const { lead, segmentacao, qualificacao } = req.body;

        if (!lead || !segmentacao || !qualificacao) {
            console.error('❌ Campos obrigatórios ausentes:', {
                lead: !!lead,
                segmentacao: !!segmentacao,
                qualificacao: !!qualificacao
            });
            return res.status(400).json({
                error: 'Campos obrigatórios ausentes (lead, segmentacao, qualificacao)'
            });
        }

        console.log('✅ Payload válido - Email:', lead.email);

        // ═══════════════════════════════════════════════════════════
        // 2. ADICIONAR METADATA SERVER-SIDE
        // ═══════════════════════════════════════════════════════════
        const clientIP = req.headers['x-forwarded-for'] ||
                         req.headers['x-real-ip'] ||
                         req.socket?.remoteAddress ||
                         'unknown';

        console.log('🔍 Metadata - IP:', clientIP);

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
        console.log('🔍 Enviando para webhook N8N...');
        console.log('Webhook URL:', process.env.WEBHOOK_URL);
        console.log('Webhook Token (primeiros 10 chars):', process.env.WEBHOOK_TOKEN?.substring(0, 10) + '...');

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

        // ═══════════════════════════════════════════════════════════
        // CORREÇÃO: N8N mudou para Basic Authentication
        // Header: www-authenticate: Basic realm="Webhook"
        // ═══════════════════════════════════════════════════════════

        // Construir Authorization header com Basic Auth
        // Formato: "Basic base64(username:password)"
        // Username pode ser vazio ou "webhook" dependendo da config do N8N
        const username = process.env.WEBHOOK_USERNAME || ''; // vazio por padrão
        const password = process.env.WEBHOOK_TOKEN;
        const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

        console.log('🔍 Autenticação configurada:');
        console.log('  Username:', username || '(vazio)');
        console.log('  Password (primeiros 10):', password.substring(0, 10) + '...');
        console.log('  Basic Auth:', 'Basic ' + basicAuth.substring(0, 20) + '...');

        const webhookResponse = await fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + basicAuth // ← Basic Auth (server-side)
            },
            body: JSON.stringify(enrichedPayload),
            signal: controller.signal
        });

        clearTimeout(timeout);

        console.log('🔍 Resposta do webhook - Status:', webhookResponse.status);
        console.log('🔍 Resposta do webhook - Headers:', Object.fromEntries(webhookResponse.headers.entries()));

        // ═══════════════════════════════════════════════════════════
        // 4. PROCESSAR RESPOSTA DO WEBHOOK
        // ═══════════════════════════════════════════════════════════
        if (!webhookResponse.ok) {
            console.error(`❌ Webhook retornou status ${webhookResponse.status}`);

            // Tentar extrair mensagem de erro do webhook
            let errorMessage = `Erro no webhook: ${webhookResponse.status}`;
            try {
                const errorData = await webhookResponse.json();
                console.error('❌ Erro do webhook:', JSON.stringify(errorData, null, 2));
                errorMessage = errorData.message || errorMessage;
            } catch (parseError) {
                console.error('❌ Não foi possível parsear resposta de erro do webhook');
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
        console.log('✅ Resposta do webhook:', JSON.stringify(data, null, 2));
        console.log('═══════════════════════════════════════════════════════════');

        return res.status(200).json(data);

    } catch (error) {
        // ═══════════════════════════════════════════════════════════
        // TRATAMENTO DE ERROS
        // ═══════════════════════════════════════════════════════════
        console.error('═══════════════════════════════════════════════════════════');
        console.error('❌ ERRO AO PROCESSAR REQUISIÇÃO');
        console.error('═══════════════════════════════════════════════════════════');
        console.error('Tipo de erro:', error.name);
        console.error('Mensagem:', error.message);
        console.error('Stack:', error.stack);

        // Erro de timeout
        if (error.name === 'AbortError') {
            console.error('❌ Timeout de 15s excedido ao chamar webhook');
            return res.status(504).json({
                error: 'Timeout ao conectar com webhook'
            });
        }

        // Erro de rede
        if (error.message?.includes('fetch') || error.message?.includes('ECONNREFUSED')) {
            console.error('❌ Erro de conexão com o webhook');
            return res.status(503).json({
                error: 'Serviço temporariamente indisponível'
            });
        }

        // Erro genérico
        console.error('❌ Erro não categorizado');
        return res.status(500).json({
            error: 'Erro interno do servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
