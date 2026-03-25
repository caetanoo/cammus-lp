Implemente apenas as correções necessárias, SEM alterar 
o fluxo de redirecionamento e SEM alterar o botão 
"Agendar agora" do obrigado.html. O fluxo atual está correto.

❌ CORREÇÃO 1 — CRÍTICO: Descomentar proteção em agendamento.html
Arquivo: agendamento.html (linha 606)
Remover os // que comentam o redirecionamento:
// window.location.href = 'forms.html';
→ window.location.href = 'forms.html';

❌ CORREÇÃO 2 — MÉDIO: Trocar localStorage por sessionStorage
forms.html (linha 2609):
localStorage.setItem('userName', firstName)
→ sessionStorage.setItem('userName', firstName)

obrigado.html (linha 631):
localStorage.getItem('userName')
→ sessionStorage.getItem('userName')

agendamento.html (linha 602):
localStorage.getItem('userName')
→ sessionStorage.getItem('userName')

⚠️ CORREÇÃO 3 — RECOMENDADO: Proteção em obrigado.html
Adicionar logo após ler o userName:
const userName = sessionStorage.getItem('userName');
if (!userName) {
    window.location.href = 'forms.html';
    return;
}

NÃO alterar:
- Botão "Agendar agora" do obrigado.html
- Fluxo de redirecionamento existente
- Nenhum link ou href dos arquivos

Após as correções, faça commit:
"fix: flow protection and sessionStorage migration"