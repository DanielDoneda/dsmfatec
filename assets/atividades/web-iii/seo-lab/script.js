const experiments = [...document.querySelectorAll('.experiment')];
const optimizers = [...document.querySelectorAll('.optimizer')];
const byId = id => document.getElementById(id);

function updateScore() {
  const active = optimizers.filter(input => input.checked).length;
  const score = 35 + active * 13;
  byId('scoreValue').textContent = score;
  byId('scoreBar').style.width = `${score}%`;
  byId('scoreRing').style.background = `conic-gradient(var(--brand) ${score}%, #2b3b53 0)`;
  byId('scoreMessage').textContent = active === 5 ? 'Todos os pilares estão otimizados.' : active >= 3 ? 'Há oportunidades claras de melhoria.' : 'A experiência e a descoberta estão comprometidas.';
}

function setVisibility(optimized) {
  const title = optimized ? 'TaskFlow Pro | Gestão de tarefas sem atrito' : 'Página inicial';
  const description = optimized ? 'Organize tarefas, acompanhe projetos e aumente a produtividade da sua equipe com o TaskFlow Pro. Comece agora de forma simples.' : 'Bem-vindo ao nosso site. Clique aqui para saber mais sobre nossos produtos e serviços.';
  byId('pageTitle').value = title; byId('pageDescription').value = description;
  byId('visibilityExplain').textContent = optimized ? 'Título descritivo, resumo útil e URL legível dão contexto antes mesmo do clique.' : 'Título genérico, descrição vaga e URL pouco clara não explicam o valor da página.';
  syncSerp();
}

function syncSerp() {
  const title = byId('pageTitle').value || 'Sem título';
  const description = byId('pageDescription').value || 'Sem descrição.';
  byId('serpTitle').textContent = title; byId('serpDescription').textContent = description;
  byId('titleCount').textContent = `${title.length}/60`; byId('descriptionCount').textContent = `${description.length}/160`;
  byId('titleCount').style.color = title.length > 60 ? 'var(--danger)' : '';
  byId('descriptionCount').style.color = description.length > 160 ? 'var(--danger)' : '';
}

function setPerformance(optimized) {
  byId('sizeMetric').textContent = optimized ? '84 KB' : '2,8 MB';
  byId('timeMetric').textContent = optimized ? '0,4 s' : '4,8 s';
  byId('formatMetric').textContent = optimized ? 'WebP' : 'PNG';
  byId('imageFormat').textContent = optimized ? 'WEBP' : 'PNG';
  byId('sizeDelta').textContent = optimized ? '−91% de transferência' : 'arquivo sem otimização';
  byId('formatNote').textContent = optimized ? 'compactação moderna' : 'maior transferência';
  document.querySelector('.mock-image').classList.toggle('heavy', !optimized);
  byId('loadStatus').textContent = 'Pronto para testar.';
}

function setExperience(optimized) {
  const labels = [...document.querySelectorAll('#phoneNav button')];
  labels.forEach((button, index) => button.textContent = optimized ? ['Início','Tarefas','Projetos'][index] : ['Ir','Aqui','Mais'][index]);
  byId('uxInstruction').textContent = optimized ? 'Abra o menu e selecione “Tarefas”. A navegação tem rótulos claros e resposta imediata.' : 'Tente descobrir qual botão leva às tarefas. Os rótulos não informam o destino.';
  byId('uxResult').textContent = 'Aguardando interação…'; byId('uxProgress').style.width = '0';
}

function setContent(optimized) {
  const nodes = [...document.querySelectorAll('#contentOutline .node span')];
  const good = ['H1','H2','H3','H3','H2']; const bad = ['DIV','H4','H2','B','H1'];
  nodes.forEach((node,index) => node.textContent = (optimized ? good : bad)[index]);
  byId('semanticCode').textContent = optimized ? '<main>\n  <h1>Gestão de projetos</h1>\n  <section>\n    <h2>Recursos principais</h2>\n    <h3>Quadro Kanban</h3>\n  </section>\n</main>' : '<div class="conteudo">\n  <div class="titulo">Gestão</div>\n  <h4>Recursos principais</h4>\n  <h2>Quadro Kanban</h2>\n  <b>Relatórios</b>\n</div>';
}

function setAccessibility(optimized) {
  const label = byId('emailLabel'); const input = byId('demoEmail'); const checks = [...document.querySelectorAll('.checks>div>span')];
  label.style.display = optimized ? '' : 'none';
  input.placeholder = optimized ? 'voce@exemplo.com' : 'Digite aqui';
  input.tabIndex = optimized ? 0 : -1; byId('subscribeButton').tabIndex = optimized ? 0 : -1;
  checks.forEach(check => check.textContent = optimized ? '✓' : '×');
  byId('checkContrast').querySelector('b').textContent = optimized ? 'Contraste adequado' : 'Contraste insuficiente';
  byId('checkLabel').querySelector('b').textContent = optimized ? 'Campos identificados' : 'Campo sem label';
  byId('checkKeyboard').querySelector('b').textContent = optimized ? 'Foco visível' : 'Fora da ordem de foco';
}

const setters = {visibility:setVisibility,performance:setPerformance,experience:setExperience,content:setContent,accessibility:setAccessibility};
optimizers.forEach(input => input.addEventListener('change', () => {
  const card = input.closest('.experiment'); const optimized = input.checked;
  card.classList.toggle('is-optimized', optimized); setters[card.dataset.pillar](optimized); updateScore();
}));

['pageTitle','pageDescription'].forEach(id => byId(id).addEventListener('input', syncSerp));
byId('loadButton').addEventListener('click', () => {
  const optimized = document.querySelector('[data-pillar=performance] .optimizer').checked;
  const duration = optimized ? 400 : 1800; const mock = document.querySelector('.mock-image');
  mock.classList.add('loading'); byId('loadButton').disabled = true; byId('loadStatus').textContent = 'Carregando recurso…';
  setTimeout(() => { mock.classList.remove('loading'); byId('loadButton').disabled = false; byId('loadStatus').textContent = optimized ? 'Concluído rapidamente: menos dados transferidos.' : 'Concluído com atraso: o arquivo pesado bloqueou a experiência.'; }, duration);
});
byId('phoneMenu').addEventListener('click', () => { const button=byId('phoneMenu'); button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') !== 'true'); });
document.querySelectorAll('#phoneNav button').forEach((button,index) => button.addEventListener('click', () => {
  const optimized = document.querySelector('[data-pillar=experience] .optimizer').checked;
  const success = optimized ? index === 1 : index === 2;
  byId('uxProgress').style.width = success ? '100%' : '40%'; byId('uxResult').textContent = success ? (optimized ? 'Encontrado em 1 clique. Caminho previsível.' : 'Encontrado por tentativa: o rótulo não ajudou.') : 'Esse botão não leva às tarefas. Tente outra vez.';
}));
byId('focusTest').addEventListener('click', () => { byId('demoEmail').focus(); });
byId('themeButton').addEventListener('click', () => { const dark=document.body.classList.toggle('dark'); byId('themeButton').setAttribute('aria-pressed', dark); byId('themeButton').setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro'); });
byId('resetLab').addEventListener('click', () => { optimizers.forEach(input => { input.checked=true; const card=input.closest('.experiment'); card.classList.add('is-optimized'); setters[card.dataset.pillar](true); }); updateScore(); byId('laboratorio').scrollIntoView({behavior:'smooth'}); });
experiments.forEach(card => card.classList.add('is-optimized'));
updateScore(); syncSerp();
