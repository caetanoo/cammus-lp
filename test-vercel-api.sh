#!/bin/bash

# ═══════════════════════════════════════════════════════════
# TESTE RÁPIDO - API VERCEL
# ═══════════════════════════════════════════════════════════

echo "🔍 Testando API Vercel..."
echo ""

# Teste 1: Verificar se endpoint existe
echo "1️⃣ Teste: Endpoint existe?"
curl -s -X POST https://cammus-ai.vercel.app/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{"test": true}' \
  -w "\nStatus Code: %{http_code}\n" \
  -o /tmp/vercel-response.txt

echo "Resposta:"
cat /tmp/vercel-response.txt
echo ""
echo ""

# Teste 2: Verificar se retorna erro esperado (400) ou 404
echo "2️⃣ Análise:"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST https://cammus-ai.vercel.app/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{"test": true}')

if [ "$STATUS" == "404" ]; then
    echo "❌ ERRO 404: Função não foi deployada ou não existe"
    echo ""
    echo "Soluções:"
    echo "  1. Verificar se função aparece em: Vercel → Deployments → Functions"
    echo "  2. Fazer redeploy SEM cache (desmarcar 'Use existing Build Cache')"
    echo "  3. Verificar se arquivo api/submit-lead.js está no repositório"
elif [ "$STATUS" == "500" ]; then
    echo "❌ ERRO 500: Função existe mas falhou ao executar"
    echo ""
    echo "Possíveis causas:"
    echo "  1. Variáveis de ambiente não configuradas (WEBHOOK_URL, WEBHOOK_TOKEN)"
    echo "  2. Erro no código da função"
    echo "  3. Webhook N8N não responde"
    echo ""
    echo "Solução:"
    echo "  1. Adicionar variáveis de ambiente na Vercel"
    echo "  2. Verificar logs: Deployments → Functions → submit-lead → Logs"
elif [ "$STATUS" == "400" ]; then
    echo "✅ SUCESSO: Função existe e está rodando!"
    echo ""
    echo "O erro 400 é ESPERADO (payload inválido)."
    echo "Isso confirma que a função está funcionando."
    echo ""
    echo "Próximo passo:"
    echo "  1. Configurar variáveis de ambiente (se ainda não fez)"
    echo "  2. Testar formulário novamente"
else
    echo "⚠️ Status inesperado: $STATUS"
    echo "Verifique a resposta acima."
fi

echo ""
echo "═══════════════════════════════════════"
echo "Para mais detalhes, veja: FIX-404-VERCEL-API.md"
