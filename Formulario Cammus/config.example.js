// Copie este arquivo para config.js e preencha com seus valores reais
// cp config.example.js config.js

const CONFIG = {
    // Token de autenticação do webhook (obtenha com o time de backend)
    WEBHOOK_TOKEN: 'seu_token_aqui',

    // URLs do webhook
    WEBHOOK_URL_DEV:  'https://webhook.dev.exemplo.com/webhook/lead-analysis',
    WEBHOOK_URL_PROD: 'https://webhook.prod.exemplo.com/webhook/lead-analysis',

    // Ambiente ativo: 'dev' ou 'prod'
    ENV: 'dev',
};

// URL resolvida pelo ambiente ativo
CONFIG.WEBHOOK_URL = CONFIG.ENV === 'prod'
    ? CONFIG.WEBHOOK_URL_PROD
    : CONFIG.WEBHOOK_URL_DEV;
