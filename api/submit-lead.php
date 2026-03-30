<?php
/**
 * ═══════════════════════════════════════════════════════════
 * CAMMUS BACKEND PROXY - PHP VERSION
 * Para hospedagem na Hostinger ou qualquer servidor PHP
 * ═══════════════════════════════════════════════════════════
 */

// Configurar headers de erro para debug (remover em produção)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Não exibir erros no response
ini_set('log_errors', 1);

// ═══════════════════════════════════════════════════════════
// CONFIGURAÇÃO - PREENCHA AQUI
// ═══════════════════════════════════════════════════════════

// ⚠️ IMPORTANTE: Estas credenciais devem estar em arquivo separado
// Crie um arquivo config.php (fora de public_html se possível)
// e mova estas variáveis para lá

define('WEBHOOK_URL', 'https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis');
define('WEBHOOK_TOKEN', 'SEU_TOKEN_AQUI'); // ⚠️ TROCAR pelo token real
define('FRONTEND_URL', '*'); // ou 'https://seudominio.com.br'

// ═══════════════════════════════════════════════════════════
// CORS HEADERS
// ═══════════════════════════════════════════════════════════

header('Access-Control-Allow-Origin: ' . FRONTEND_URL);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ═══════════════════════════════════════════════════════════
// VALIDAR MÉTODO HTTP
// ═══════════════════════════════════════════════════════════

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido. Use POST.']);
    exit;
}

// ═══════════════════════════════════════════════════════════
// VALIDAÇÃO DE CONFIGURAÇÃO
// ═══════════════════════════════════════════════════════════

if (WEBHOOK_TOKEN === 'SEU_TOKEN_AQUI' || empty(WEBHOOK_TOKEN)) {
    http_response_code(500);
    echo json_encode(['error' => 'Configuração inválida do servidor (token não configurado)']);
    exit;
}

if (empty(WEBHOOK_URL)) {
    http_response_code(500);
    echo json_encode(['error' => 'Configuração inválida do servidor (URL não configurada)']);
    exit;
}

// ═══════════════════════════════════════════════════════════
// LER E VALIDAR PAYLOAD
// ═══════════════════════════════════════════════════════════

$input = file_get_contents('php://input');
$payload = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido']);
    exit;
}

if (empty($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Payload vazio']);
    exit;
}

// Validar campos obrigatórios
if (!isset($payload['lead']) || !isset($payload['segmentacao']) || !isset($payload['qualificacao'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos obrigatórios ausentes (lead, segmentacao, qualificacao)']);
    exit;
}

// ═══════════════════════════════════════════════════════════
// ADICIONAR METADATA SERVER-SIDE
// ═══════════════════════════════════════════════════════════

$clientIP = '';
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
} elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
    $clientIP = $_SERVER['HTTP_X_REAL_IP'];
} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
    $clientIP = $_SERVER['REMOTE_ADDR'];
}

if (!isset($payload['metadata'])) {
    $payload['metadata'] = [];
}

$payload['metadata']['client_ip'] = $clientIP;
$payload['metadata']['server_timestamp'] = date('c'); // ISO 8601
$payload['metadata']['user_agent'] = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

// ═══════════════════════════════════════════════════════════
// FAZER REQUISIÇÃO AO WEBHOOK N8N
// ═══════════════════════════════════════════════════════════

$ch = curl_init(WEBHOOK_URL);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'X-Webhook-Token: ' . WEBHOOK_TOKEN
]);

// Executar requisição
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

// ═══════════════════════════════════════════════════════════
// TRATAR RESPOSTA
// ═══════════════════════════════════════════════════════════

// Erro de conexão
if ($response === false) {
    error_log("CAMMUS API: Erro ao conectar com webhook N8N: $error");
    http_response_code(503);
    echo json_encode(['error' => 'Serviço temporariamente indisponível']);
    exit;
}

// Webhook retornou erro
if ($httpCode !== 200) {
    error_log("CAMMUS API: Webhook retornou status $httpCode");
    http_response_code($httpCode);
    echo $response; // Retornar resposta do webhook
    exit;
}

// Sucesso
error_log("CAMMUS API: Lead enviado com sucesso - Email: {$payload['lead']['email']}");
http_response_code(200);
echo $response;

// ═══════════════════════════════════════════════════════════
// RATE LIMITING (OPCIONAL)
// ═══════════════════════════════════════════════════════════
//
// Para implementar rate limiting em PHP, você pode:
//
// 1. Usar sessões PHP (limitado)
// 2. Usar Redis (requer extensão phpredis)
// 3. Usar arquivo de cache (pode ter problemas de concorrência)
// 4. Confiar no rate limiting do frontend (atual)
//
// Implementação com Redis (se disponível):
// https://github.com/DaveRandom/PHPRateLimit
//
// ═══════════════════════════════════════════════════════════
