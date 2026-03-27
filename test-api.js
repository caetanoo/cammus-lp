#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════
// SCRIPT DE TESTE - API /api/submit-lead
// Simula uma requisição do formulário para a função serverless
// ═══════════════════════════════════════════════════════════

const testPayload = {
    lead: {
        nome: "João Teste",
        email: "joao.teste@empresa.com.br",
        telefone: "+55 11 99999-9999",
        cargo: "CEO",
        empresa: "Empresa Teste LTDA"
    },
    segmentacao: {
        nicho: "Tecnologia",
        tamanho_empresa: "Médio porte (50-200 funcionários)",
        faturamento_anual: "R$ 5-20M/ano"
    },
    qualificacao: {
        principal_desafio: "Gerar leads qualificados",
        investimento_marketing: "R$ 5.000-R$ 10.000/mês",
        urgencia: "Imediato (próximos 30 dias)"
    },
    metadata: {
        timestamp: new Date().toISOString(),
        user_agent: "Test Script",
        page_url: "http://localhost:8000/test"
    }
};

console.log('═══════════════════════════════════════════════════════════');
console.log('🧪 TESTE - API /api/submit-lead');
console.log('═══════════════════════════════════════════════════════════\n');

// Escolha qual URL testar:
// const API_URL = 'http://localhost:3000/api/submit-lead'; // Desenvolvimento local
const API_URL = 'https://seu-dominio.vercel.app/api/submit-lead'; // Produção Vercel

console.log('🔗 URL:', API_URL);
console.log('📦 Payload:', JSON.stringify(testPayload, null, 2));
console.log('\n🚀 Enviando requisição...\n');

fetch(API_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(testPayload)
})
.then(response => {
    console.log('📊 Status HTTP:', response.status, response.statusText);
    console.log('📋 Headers de resposta:');
    response.headers.forEach((value, key) => {
        console.log(`  ${key}: ${value}`);
    });
    console.log('');

    return response.json().then(data => ({ status: response.status, data }));
})
.then(({ status, data }) => {
    console.log('═══════════════════════════════════════════════════════════');
    if (status >= 200 && status < 300) {
        console.log('✅ SUCESSO!');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('Resposta:', JSON.stringify(data, null, 2));
    } else {
        console.log('❌ ERRO!');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('Status:', status);
        console.log('Erro:', JSON.stringify(data, null, 2));

        // Diagnóstico de erros comuns
        console.log('\n🔍 DIAGNÓSTICO:');
        if (data.error?.includes('WEBHOOK_URL ausente')) {
            console.log('❌ Variável WEBHOOK_URL não configurada na Vercel');
            console.log('👉 Solução: Settings → Environment Variables → Adicionar WEBHOOK_URL');
        }
        if (data.error?.includes('WEBHOOK_TOKEN ausente')) {
            console.log('❌ Variável WEBHOOK_TOKEN não configurada na Vercel');
            console.log('👉 Solução: Settings → Environment Variables → Adicionar WEBHOOK_TOKEN');
        }
        if (status === 404) {
            console.log('❌ Função serverless não encontrada');
            console.log('👉 Solução: Verificar se /api/submit-lead.js foi deployado');
        }
        if (status === 504) {
            console.log('❌ Timeout - Webhook N8N não respondeu em 15s');
            console.log('👉 Solução: Verificar se webhook N8N está online');
        }
        if (status === 401 || status === 403) {
            console.log('❌ Token de autenticação inválido');
            console.log('👉 Solução: Verificar WEBHOOK_TOKEN');
        }
    }
    console.log('═══════════════════════════════════════════════════════════');
})
.catch(error => {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('❌ ERRO DE CONEXÃO!');
    console.log('═══════════════════════════════════════════════════════════');
    console.error('Erro:', error.message);

    if (error.message.includes('fetch failed')) {
        console.log('\n🔍 DIAGNÓSTICO:');
        console.log('❌ Não foi possível conectar à API');
        console.log('👉 Possíveis causas:');
        console.log('   - URL incorreta');
        console.log('   - Servidor offline');
        console.log('   - Problemas de rede');
    }
    console.log('═══════════════════════════════════════════════════════════');
});
