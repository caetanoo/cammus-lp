Você é um especialista em segurança web (AppSec) e sua missão é realizar 
uma auditoria COMPLETA de vulnerabilidades no site, analisando os arquivos:

📁 ESCOPO:
- agendamento.html
- forms.html (ou forms.htm)
- obrigado.html
- Qualquer arquivo JS, CSS ou backend conectado a esses arquivos

⚠️ IMPORTANTE: Esta é uma auditoria defensiva para PROTEGER o site.
Identifique vulnerabilidades e proponha correções — não explore nada.

═══════════════════════════════════════
## FASE 1 — RECONHECIMENTO (NÃO ALTERE NADA)
═══════════════════════════════════════

Mapeie toda a superfície de ataque:
- Todos os campos de input e formulários
- Scripts externos carregados (CDNs, APIs, Calendly, etc.)
- Dados coletados e onde são enviados
- Métodos HTTP utilizados
- Presença ou ausência de HTTPS
- Headers de segurança presentes/ausentes
- Cookies e armazenamento local utilizado

═══════════════════════════════════════
## FASE 2 — AUDITORIA OWASP TOP 10
═══════════════════════════════════════

Verifique cada item da lista OWASP Top 10 nos arquivos:

A01 — Broken Access Control
□ Existem páginas acessíveis sem autenticação que deveriam ser protegidas?
□ O obrigado.html é acessível diretamente via URL sem passar pelo form?
□ Há parâmetros na URL que podem ser manipulados?

A02 — Cryptographic Failures
□ Dados sensíveis trafegam em texto puro?
□ Formulários submetidos via HTTP em vez de HTTPS?
□ Senhas ou tokens expostos no código-fonte?

A03 — Injection (XSS, HTML Injection)
□ Campos de input sanitizados antes de exibir na tela?
□ Possibilidade de Cross-Site Scripting (XSS) refletido ou armazenado?
□ Inputs aceitam scripts como: <script>alert(1)</script> ?
□ Campos como nome, email, whatsapp validados e escapados?

A04 — Insecure Design
□ Fluxo do formulário pode ser bypassado?
□ É possível submeter o form múltiplas vezes sem limitação?
□ Ausência de rate limiting nos endpoints?

A05 — Security Misconfiguration
□ Headers HTTP de segurança presentes?
  - Content-Security-Policy (CSP)
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
□ Mensagens de erro expõem informações técnicas?
□ Console.log() com dados sensíveis visível em produção?

A06 — Vulnerable Components
□ Bibliotecas JS/CSS desatualizadas ou com CVEs conhecidos?
□ Scripts carregados de CDNs externos sem Subresource Integrity (SRI)?
□ Versões de frameworks expostas nos meta tags ou headers?

A07 — Authentication Failures
□ Ausência de proteção contra bots nos formulários?
□ CAPTCHA ou honeypot implementado?
□ Sem limite de tentativas de envio?

A08 — Software and Data Integrity
□ Scripts externos verificados com hash SRI?
□ Dependências de terceiros (Calendly, analytics) auditadas?
□ Possibilidade de supply chain attack via CDN?

A09 — Logging and Monitoring
□ Erros de formulário logados de forma segura?
□ Tentativas de ataque registradas?
□ Alertas configurados para comportamento anômalo?

A10 — Server-Side Request Forgery (SSRF)
□ Inputs do usuário usados para fazer requisições externas?
□ URLs dinâmicas baseadas em parâmetros do usuário?

═══════════════════════════════════════
## FASE 3 — VULNERABILIDADES ESPECÍFICAS DE FORMULÁRIOS
═══════════════════════════════════════

Analise especificamente:

SPAM E BOTS
□ Implementação de honeypot field?
□ Rate limiting por IP?
□ Validação server-side além do client-side?
□ Token CSRF nos formulários?

DADOS PESSOAIS (LGPD)
□ Campos coletados são necessários (minimização de dados)?
□ Política de privacidade linkada antes do envio?
□ Consentimento explícito do usuário registrado?
□ Dados de WhatsApp/email protegidos?

EXPOSIÇÃO DE DADOS
□ Dados do formulário expostos na URL após submit?
□ Informações sensíveis no histórico do browser?
□ Autocomplete habilitado em campos sensíveis?

═══════════════════════════════════════
## FASE 4 — RELATÓRIO DE VULNERABILIDADES
═══════════════════════════════════════

Apresente cada vulnerabilidade encontrada no formato:

🔴 CRÍTICO / 🟠 ALTO / 🟡 MÉDIO / 🟢 BAIXO / ℹ️ INFORMATIVO

[SEVERIDADE] Nome da Vulnerabilidade
├── Arquivo: [onde foi encontrado]
├── Linha: [número da linha]
├── Descrição: [o que é o problema]
├── Impacto: [o que um atacante pode fazer]
├── Evidência: [trecho do código vulnerável]
└── Correção: [como resolver com código]

═══════════════════════════════════════
## FASE 5 — PLANO DE HARDENING
═══════════════════════════════════════

Após o relatório, apresente um plano de correção priorizado:

PRIORIDADE 1 — Correção imediata (24h)
Lista de vulnerabilidades críticas e altas com código de correção pronto

PRIORIDADE 2 — Correção no próximo deploy (7 dias)
Lista de vulnerabilidades médias com implementação sugerida

PRIORIDADE 3 — Melhorias de longo prazo (30 dias)
Boas práticas e melhorias arquiteturais recomendadas

CHECKLIST DE SEGURANÇA MÍNIMA:
□ CSP Header configurado
□ HTTPS forçado em todos os endpoints
□ Inputs sanitizados e validados server-side
□ CSRF token nos formulários
□ Honeypot anti-bot implementado
□ SRI em todos os scripts externos
□ Dados LGPD mapeados e protegidos
□ Rate limiting no backend
□ Logs de segurança ativos

═══════════════════════════════════════
## RESTRIÇÕES IMPORTANTES
═══════════════════════════════════════
- ⛔ NÃO modifique nenhum arquivo durante a auditoria
- ⛔ NÃO explore vulnerabilidades — apenas identifique e documente
- ✅ Seja específico com números de linha e trechos de código
- ✅ Aguarde aprovação antes de aplicar qualquer correção
- ✅ Priorize proteção de dados dos usuários (LGPD)

Comece pelo RECONHECIMENTO e apresente o relatório completo 
antes de qualquer ação.