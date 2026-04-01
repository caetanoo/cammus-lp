#!/bin/bash

# ═══════════════════════════════════════════════════════════
# TESTE DO WEBHOOK N8N - Diagnóstico do erro 403
# ═══════════════════════════════════════════════════════════

echo "🔍 Testando Webhook N8N diretamente..."
echo ""

# Variáveis de ambiente (EDITE AQUI COM OS VALORES REAIS)
WEBHOOK_URL="https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis"
WEBHOOK_TOKEN="29dd43a31c2419183e0eb7d7b298335050807c5d83fb5c231cf02c3b740e0e1a"

echo "📍 URL: $WEBHOOK_URL"
echo "🔑 Token (primeiros 10 chars): ${WEBHOOK_TOKEN:0:10}..."
echo ""

# Payload de teste
PAYLOAD='{
  "lead": {
    "nome": "Teste Sistema",
    "email": "teste@exemplo.com",
    "empresa": "Empresa Teste",
    "whatsapp": "+55 (11) 99999-9999"
  },
  "segmentacao": {
    "nicho": "tecnologia",
    "ticket_medio": "R$ 5.000",
    "maturidade_digital": "Avançado"
  },
  "qualificacao": {
    "urgencia": "Até 3 meses",
    "contexto": "Teste de diagnóstico do sistema"
  },
  "metadata": {
    "client_ip": "teste",
    "server_timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "user_agent": "test-script"
  }
}'

echo "═══════════════════════════════════════════════════════════"
echo "1️⃣ Teste COM token (X-Webhook-Token header)"
echo "═══════════════════════════════════════════════════════════"

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Webhook-Token: $WEBHOOK_TOKEN" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status Code: $HTTP_CODE"
echo "Resposta:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "201" ]; then
    echo "✅ SUCESSO: Webhook aceita requisições com token"
elif [ "$HTTP_CODE" == "403" ]; then
    echo "❌ ERRO 403: Token inválido, expirado ou formato incorreto"
    echo ""
    echo "Possíveis causas:"
    echo "  1. Token está errado/expirado no N8N"
    echo "  2. Header 'X-Webhook-Token' não é reconhecido"
    echo "  3. Webhook mudou e agora usa autenticação diferente"
    echo "  4. IP da Vercel está bloqueado no N8N"
elif [ "$HTTP_CODE" == "401" ]; then
    echo "❌ ERRO 401: Autenticação ausente ou inválida"
else
    echo "⚠️ Status inesperado: $HTTP_CODE"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "2️⃣ Teste SEM token (para comparação)"
echo "═══════════════════════════════════════════════════════════"

RESPONSE_NO_TOKEN=$(curl -s -w "\n%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "$PAYLOAD")

HTTP_CODE_NO_TOKEN=$(echo "$RESPONSE_NO_TOKEN" | tail -n1)
BODY_NO_TOKEN=$(echo "$RESPONSE_NO_TOKEN" | head -n-1)

echo "Status Code: $HTTP_CODE_NO_TOKEN"
echo "Resposta:"
echo "$BODY_NO_TOKEN" | jq '.' 2>/dev/null || echo "$BODY_NO_TOKEN"
echo ""

if [ "$HTTP_CODE" == "$HTTP_CODE_NO_TOKEN" ]; then
    echo "⚠️ ATENÇÃO: Status igual com e sem token!"
    echo "Isso indica que o webhook pode não estar validando o token corretamente."
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📊 DIAGNÓSTICO"
echo "═══════════════════════════════════════════════════════════"

if [ "$HTTP_CODE" == "403" ]; then
    echo "🔴 PROBLEMA CONFIRMADO: Webhook N8N retorna 403"
    echo ""
    echo "AÇÕES NECESSÁRIAS:"
    echo "  1. Verifique se o token na Vercel está correto"
    echo "     Vercel Dashboard → Settings → Environment Variables"
    echo "     Variável: WEBHOOK_TOKEN"
    echo ""
    echo "  2. Verifique se o webhook N8N ainda existe e está ativo"
    echo "     Acesse: $WEBHOOK_URL"
    echo ""
    echo "  3. Verifique logs do N8N para ver por que está rejeitando"
    echo ""
    echo "  4. Token atual no código:"
    echo "     $WEBHOOK_TOKEN"
elif [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "201" ]; then
    echo "✅ Webhook funcionando!"
    echo ""
    echo "O problema então está na CONFIGURAÇÃO DA VERCEL:"
    echo "  1. Variável WEBHOOK_TOKEN pode estar diferente"
    echo "  2. Variável WEBHOOK_URL pode estar diferente"
    echo ""
    echo "Verifique em: Vercel Dashboard → Settings → Environment Variables"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
