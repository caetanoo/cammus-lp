/**
 * ═══════════════════════════════════════════════════════════
 * CONFIGURAÇÃO DE API - CAMMUS FORMS
 * ═══════════════════════════════════════════════════════════
 *
 * Este arquivo permite alternar facilmente entre diferentes
 * ambientes de hospedagem.
 */

// ═══════════════════════════════════════════════════════════
// ESCOLHA O AMBIENTE ATIVO
// ═══════════════════════════════════════════════════════════

const API_CONFIG = {
    // Opções: 'local', 'vercel', 'hostinger-php', 'hostinger-nodejs'
    ambiente: 'vercel',

    endpoints: {
        // Desenvolvimento local
        local: 'http://localhost:3000/api/submit-lead',

        // Vercel (serverless Node.js)
        vercel: 'https://cammus-ai.vercel.app/api/submit-lead',

        // Hostinger com PHP proxy
        'hostinger-php': '/api/submit-lead.php',

        // Hostinger com Node.js (se tiver VPS)
        'hostinger-nodejs': '/api/submit-lead',

        // Auto-detect (usa relativo se estiver em produção, localhost se estiver local)
        auto: window.location.hostname === 'localhost'
            ? 'http://localhost:3000/api/submit-lead'
            : '/api/submit-lead'
    }
};

// Obter URL ativa
function getWebhookURL() {
    return API_CONFIG.endpoints[API_CONFIG.ambiente] || API_CONFIG.endpoints.auto;
}

// Exportar para uso global
window.CAMMUS_API = {
    WEBHOOK_URL: getWebhookURL(),
    AMBIENTE: API_CONFIG.ambiente
};

// Log para debug (remover em produção)
if (window.location.hostname === 'localhost') {
    console.log('🔧 CAMMUS API Config:', {
        ambiente: API_CONFIG.ambiente,
        url: getWebhookURL()
    });
}
