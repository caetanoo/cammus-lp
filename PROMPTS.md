# Prompts de Trabalho

Cole aqui seus prompts para reutilizar com Claude Code ou outras ferramentas.

---

## Prompt: Organização de Projeto Web + Git

```
Você é um engenheiro sênior de software especialista em organização de projetos web e boas práticas de versionamento com Git/GitHub.

## Contexto do projeto
- Stack: HTML + CSS + JavaScript puro (vanilla)
- O projeto contém um formulário web com suas dependências (assets, scripts, estilos)
- O diretório local está desorganizado — sem estrutura de pastas definida
- Não existe repositório Git ainda (nem local, nem no GitHub)

## ⚠️ ÚNICA REGRA ABSOLUTA — Backup antes de qualquer ação
Antes de analisar, mover, renomear ou deletar qualquer coisa, crie um backup completo do projeto. Sem exceções. Só depois disso você tem autonomia total para organizar tudo da melhor forma que julgar como engenheiro sênior.

---

## FASE 0 — Backup completo (primeira ação, sem exceção)

Execute imediatamente:

```bash
cp -r . ../backup_$(basename "$PWD")_$(date +%Y%m%d_%H%M%S)
```

Após executar:
1. Confirme o caminho completo onde o backup foi salvo
2. Liste os arquivos copiados para garantir que está completo
3. Só então continue para a Fase 1

O backup nunca será apagado ou alterado durante o processo.

---

## FASE 1 — Auditoria e proposta (sem mexer no projeto ainda)

Analise todo o diretório e me apresente:

1. Mapa completo de todos os arquivos e pastas existentes
2. Identificação de arquivos sensíveis (senhas, tokens, .env, chaves de API) — alerte imediatamente se encontrar
3. Sua proposta de estrutura ideal para este projeto, justificando cada decisão técnica
4. O que será movido, renomeado, o que vai para .gitignore e o que pode ser removido

Aguarde minha aprovação antes de continuar.

---

## FASE 2 — Reorganização (após aprovação)

Com autonomia total de engenheiro sênior:
- Execute a melhor estrutura que você propôs e eu aprovei
- Corrija todos os caminhos (src, href, link) nos arquivos HTML/CSS/JS após mover
- Me informe o que foi feito ao final com um resumo claro

---

## FASE 3 — Arquivos de configuração e segurança

### .gitignore
Crie um .gitignore completo para o projeto, cobrindo:
- .env e arquivos com credenciais
- node_modules/
- arquivos de sistema (.DS_Store, Thumbs.db)
- editores (.vscode/, .idea/)
- temporários, logs e builds

### .env.example
Se houver variáveis de ambiente:
- Crie .env.example com as chaves sem os valores reais
- Comente cada variável explicando o que ela representa

---

## FASE 4 — README.md profissional

Crie um README.md completo e bem escrito, cobrindo:
- Nome e descrição clara do projeto
- Funcionalidades principais
- Como rodar localmente
- Estrutura de pastas
- Variáveis de ambiente (se aplicável)
- Tecnologias utilizadas
- Como contribuir
- Licença

---

## FASE 5 — Git: inicialização e commits semânticos

```bash
git init
git add .gitignore
git commit -m "chore: add gitignore"

git add README.md
git commit -m "docs: add README"

git add .env.example
git commit -m "chore: add env example"

git add .
git commit -m "feat: initial project structure with form and assets"
```

Padrão Conventional Commits:
- feat: nova funcionalidade
- fix: correção de bug
- docs: documentação
- chore: configuração, dependências
- refactor: refatoração sem mudar comportamento
- style: formatação (sem lógica)

---

## FASE 6 — Push para o GitHub

Via GitHub CLI (preferencial):
```bash
gh repo create nome-do-repo --public --source=. --remote=origin --push
```

Ou manualmente:
```bash
git remote add origin https://github.com/SEU_USUARIO/nome-do-repo.git
git branch -M main
git push -u origin main
```

Checklist pós-push:
- .env não foi para o repositório
- .gitignore está funcionando corretamente
- Estrutura de pastas está correta no GitHub
- Backup local ainda existe e está íntegro
```

---

## Prompt: Criar Skill flux-aurora-video-content

```
Use a skill de skill-creator para criar uma nova skill chamada "flux-aurora-video-content".

ARQUIVO DO DESIGN SYSTEM:
/Users/caetanovizel/Desktop/LP CAMMUS/flux-aurora-v2-minimalista.html

IMPORTANTE: Analise TODO o conteúdo deste arquivo HTML acima. Ele contém nosso design system completo (cores, tipografia, componentes, animações, espaçamentos). A skill DEVE usar EXATAMENTE esses elementos visuais.

OBJETIVO DA SKILL:
Criar elementos visuais para vídeos "build in public" da nossa startup, SEMPRE seguindo 100% o design system do arquivo acima.

Elementos que a skill deve criar:
- Gráficos e charts animados (visualização de dados)
- Lower thirds (legendas de identificação)
- Title cards e slides de seção
- Overlays e transições
- Infográficos animados
- Text overlays
- Qualquer elemento visual para vídeo

QUANDO DEVE ACIONAR (description da skill):
- Usuário menciona "criar gráfico/chart para vídeo"
- Pede "elementos visuais" + contexto de vídeo
- Solicita "lower third", "title card", "overlay", "transição"
- Quer "ilustrar roteiro" ou "visualizar conceito" para vídeo
- Menciona "infográfico animado" ou "animação"
- Qualquer pedido de conteúdo visual que combine: vídeo + nossa identidade/design system
- Use a skill mesmo que não mencionem explicitamente "flux-aurora" - se pedirem conteúdo visual para vídeo, USE ESTA SKILL

OUTPUT ESPERADO:
- HTML/CSS/JavaScript funcional e renderizável
- Código que pode ser capturado/gravado como vídeo
- SEMPRE aplicando: cores exatas, fontes, espaçamentos, estilo do flux-aurora-v2-minimalista.html
- Elementos prontos para usar em produção de vídeo

ESTRUTURA DA SKILL:
skill-name: flux-aurora-video-content

Organize em:
- SKILL.md (instruções principais)
- references/design-system.md (extração completa das cores, tipografia, grid do HTML)
- references/video-components.md (templates e padrões para vídeo)
- references/examples.md (casos de uso práticos)
- assets/flux-aurora-v2-minimalista.html (cópia do arquivo original como referência)

CASOS DE TESTE:
1. "Crie um gráfico de linha animado mostrando crescimento mensal para nosso vídeo"
2. "Preciso de um lower third com nome e cargo seguindo nossa identidade"
3. "Gere um title card para a seção 'Nossa Jornada'"
4. "Crie um infográfico animado explicando nossos 3 pilares"
5. "Faça um overlay de estatística (número grande + descrição)"
```

---

## Prompt: Auditoria e correções pré-deploy dos formulários

```
Preciso que você corrija todos os problemas identificados na auditoria pré-deploy 
nas páginas forms.html, agendamento.html e obrigado.html. 

Siga a ordem de prioridade abaixo e confirme cada correção feita:

---

## 🔴 PRIORIDADE ALTA — Webhook URL exposta (forms.html:2013)

O webhook está exposto diretamente no JS client-side. Como é frontend puro sem 
backend, mitigue da seguinte forma:

1. Mova a URL do webhook para uma variável no topo do script, com comentário 
   explicando que deve ir para variável de ambiente em caso de refatoração futura
2. Verifique se o fetch para o webhook já inclui um header de autenticação/token. 
   Se não tiver, adicione um header customizado:
   "X-Webhook-Token": "SEU_TOKEN_AQUI"
   e coloque um comentário TODO para substituir por env var no futuro
3. Certifique-se que o fetch tem tratamento de erro adequado (try/catch + 
   feedback visual para o usuário em caso de falha)

---

## 🔴 PRIORIDADE ALTA — Fluxo Calendly → obrigado.html incompleto (agendamento.html)

Atualmente o usuário só chega em obrigado.html pelo botão "Pular agendamento". 
Corrija adicionando o listener do evento Calendly:

window.addEventListener("message", function(e) {
  if (e.origin.includes("calendly.com") && 
      e.data.event && 
      e.data.event === "calendly.event_scheduled") {
    window.location.href = "obrigado.html";
  }
});

Adicione esse listener logo após o script de embed do Calendly.

---

## 🟡 PRIORIDADE MÉDIA — Tailwind CDN bloqueante

1. Adicione defer na tag script do Tailwind CDN nas duas páginas
2. Verifique visualmente se há risco de FOUC

---

## 🟢 PRIORIDADE BAIXA — Correções nas 3 páginas

- Meta description em cada página
- Favicon (emoji fallback se não existir)
- Remover console.log de produção (manter apenas dentro de if localhost)

---

## ✅ Ao finalizar, me entregue:

1. Resumo das alterações feitas em cada arquivo
2. Confirmação de que o fluxo completo funciona:
   forms.html → (webhook disparado) → agendamento.html → 
   (Calendly agendado OU botão pular) → obrigado.html
3. Lista do que não foi possível corrigir automaticamente
```
