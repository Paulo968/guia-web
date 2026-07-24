import { categories, technologies, learningPaths, labExamples } from './data.js';

const state = {
  category: 'Todos',
  level: 'all',
  query: '',
  activeTechnology: null,
  studied: new Set(JSON.parse(localStorage.getItem('guia-web-studied') || '[]')),
  labExample: 'card',
  labEditor: 'html'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const technologyGrid = $('#technologyGrid');
const categoryFilters = $('#categoryFilters');
const resultsCount = $('#resultsCount');
const emptyState = $('#emptyState');
const searchInput = $('#technologySearch');
const levelFilter = $('#levelFilter');
const clearFiltersButton = $('#clearFilters');
const pathsGrid = $('#pathsGrid');
const drawer = $('#technologyDrawer');
const drawerBackdrop = $('#drawerBackdrop');
const drawerHeading = $('#drawerHeading');
const drawerContent = $('#drawerContent');
const drawerClose = $('#drawerClose');
const studiedButton = $('#studiedButton');
const studiedCount = $('#studiedCount');
const technologyCount = $('#technologyCount');
const toast = $('#toast');
const themeButton = $('#themeButton');
const themeIcon = $('#themeIcon');

function normalize(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function escapeHtml(value = '') {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function getTechnology(id) {
  return technologies.find((technology) => technology.id === id);
}

function saveStudied() {
  localStorage.setItem('guia-web-studied', JSON.stringify([...state.studied]));
  updateProgress();
}

function updateProgress() {
  studiedCount.textContent = state.studied.size;
  technologyCount.textContent = technologies.length;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderFilters() {
  categoryFilters.innerHTML = categories.map((category) => `
    <button class="filter-chip ${state.category === category ? 'active' : ''}" type="button" data-category="${category}" aria-pressed="${state.category === category}">${category}</button>
  `).join('');
}

function filteredTechnologies() {
  const query = normalize(state.query);
  return technologies.filter((technology) => {
    const matchesCategory = state.category === 'Todos' || technology.category === state.category;
    const matchesLevel = state.level === 'all' || technology.level === state.level;
    const searchable = normalize([
      technology.name,
      technology.category,
      technology.level,
      technology.summary,
      technology.definition,
      technology.analogy,
      technology.searchTerms,
      ...technology.useCases,
      ...technology.prerequisites
    ].join(' '));
    const matchesQuery = !query || searchable.includes(query);
    return matchesCategory && matchesLevel && matchesQuery;
  });
}

function renderTechnologies() {
  const list = filteredTechnologies();
  resultsCount.textContent = `${list.length} ${list.length === 1 ? 'tecnologia encontrada' : 'tecnologias encontradas'}`;
  emptyState.classList.toggle('hidden', list.length > 0);
  technologyGrid.classList.toggle('hidden', list.length === 0);
  technologyGrid.innerHTML = list.map((technology) => `
    <button class="technology-card" type="button" data-tech-id="${technology.id}" style="--accent:${technology.accent}" aria-label="Abrir detalhes de ${technology.name}">
      <span class="card-top"><span class="tech-logo" aria-hidden="true">${technology.logo}</span><span class="level-badge">${technology.level}</span></span>
      <h3>${technology.name}</h3>
      <p>${technology.summary}</p>
      <span class="card-footer"><span class="category-label">${technology.category}</span><span class="card-arrow" aria-hidden="true">→</span></span>
      ${state.studied.has(technology.id) ? '<span class="studied-dot" title="Tecnologia estudada"></span>' : ''}
    </button>
  `).join('');
}

function renderPaths() {
  pathsGrid.innerHTML = learningPaths.map((path) => `
    <article class="path-card" style="--path-accent:${path.accent}">
      <span class="path-number">${path.number}</span>
      <h3>${path.title}</h3>
      <p>${path.description}</p>
      <ol class="path-steps">
        ${path.steps.map((id, index) => {
          const technology = getTechnology(id);
          return `<li><span>${String(index + 1).padStart(2, '0')}</span>${technology.name}</li>`;
        }).join('')}
      </ol>
      <button type="button" data-path-id="${path.id}">Começar pela primeira etapa</button>
    </article>
  `).join('');
}

function previewDocument(example) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${example.css || ''}</style></head><body>${example.html || ''}<script>window.addEventListener('error',function(event){document.body.insertAdjacentHTML('beforeend','<pre style="margin:16px;padding:12px;border-radius:10px;background:#fee2e2;color:#991b1b;font:12px monospace">Erro: '+event.message.replace(/</g,'&lt;')+'</pre>')});${example.js || ''}<\/script></body></html>`;
}

function renderDrawer(technology) {
  const isStudied = state.studied.has(technology.id);
  drawer.style.setProperty('--detail-accent', technology.accent);
  drawerHeading.innerHTML = `<span class="tech-logo" style="--accent:${technology.accent}" aria-hidden="true">${technology.logo}</span><div><h2 id="drawerTitle">${technology.name}</h2><p>${technology.category} · ${technology.level}</p></div>`;
  studiedButton.textContent = isStudied ? '✓ Marcada como estudada' : 'Marcar como estudada';
  studiedButton.classList.toggle('active', isStudied);
  drawerContent.innerHTML = `
    <section class="detail-hero">
      <span class="detail-label">O que é</span>
      <h3>${technology.definition}</h3>
      <p>${technology.summary}</p>
      <div class="analogy-box"><span aria-hidden="true">💡</span><div><strong>Analogia simples</strong><p>${technology.analogy}</p></div></div>
    </section>
    <section class="detail-section"><div class="detail-grid">
      <article class="info-card"><strong>Categoria</strong><p>${technology.category}</p></article>
      <article class="info-card"><strong>Nível</strong><p>${technology.level}</p></article>
      <article class="info-card"><strong>Pré-requisitos</strong><p>${technology.prerequisites.join(', ')}</p></article>
      <article class="info-card"><strong>Exemplo</strong><p>${technology.example.title}</p></article>
    </div></section>
    <section class="detail-section"><h4>Quando esta tecnologia é usada</h4><ul class="bullet-list">${technology.useCases.map((item) => `<li>${item}</li>`).join('')}</ul></section>
    <section class="detail-section"><h4>O que ela não resolve sozinha</h4><ul class="bullet-list negative">${technology.notFor.map((item) => `<li>${item}</li>`).join('')}</ul></section>
    <section class="detail-section">
      <h4>${technology.example.title}</h4>
      <div class="code-example"><div class="code-example-header"><span>${technology.example.language}</span><button class="copy-button" type="button" data-copy-code>Copiar código</button></div><pre><code>${escapeHtml(technology.example.code)}</code></pre></div>
      <div class="example-preview"><div class="example-preview-label">Resultado visual</div><iframe title="Resultado do exemplo de ${technology.name}" sandbox="allow-scripts"></iframe></div>
    </section>
    <section class="detail-section"><h4>Continue explorando</h4><div class="related-list">${technology.related.map((id) => {
      const related = getTechnology(id);
      return `<button class="related-button" type="button" data-related-id="${id}">${related.name} →</button>`;
    }).join('')}</div></section>
  `;
  $('.example-preview iframe', drawerContent).srcdoc = previewDocument(technology.example);
}

function openTechnology(id, { updateHash = true } = {}) {
  const technology = getTechnology(id);
  if (!technology) return;
  state.activeTechnology = id;
  renderDrawer(technology);
  drawerBackdrop.classList.remove('hidden');
  requestAnimationFrame(() => drawer.classList.add('open'));
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('drawer-open');
  if (updateHash) history.replaceState(null, '', `#tecnologia-${id}`);
  window.setTimeout(() => drawerClose.focus(), 220);
}

function closeDrawer({ restoreHash = true } = {}) {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  drawerBackdrop.classList.add('hidden');
  document.body.classList.remove('drawer-open');
  state.activeTechnology = null;
  if (restoreHash && location.hash.startsWith('#tecnologia-')) history.replaceState(null, '', '#biblioteca');
}

function applyFilters() {
  renderFilters();
  renderTechnologies();
}

function resetFilters() {
  state.category = 'Todos';
  state.level = 'all';
  state.query = '';
  searchInput.value = '';
  levelFilter.value = 'all';
  applyFilters();
}

function setTheme(theme) {
  const light = theme === 'light';
  document.documentElement.classList.toggle('light', light);
  themeIcon.textContent = light ? '☀' : '☾';
  themeButton.setAttribute('aria-label', light ? 'Ativar tema escuro' : 'Ativar tema claro');
  localStorage.setItem('guia-web-theme', theme);
}

function initTheme() {
  const stored = localStorage.getItem('guia-web-theme');
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  setTheme(stored || preferred);
}

function initLab() {
  const exampleSelect = $('#labExample');
  const htmlEditor = $('#htmlEditor');
  const cssEditor = $('#cssEditor');
  const jsEditor = $('#jsEditor');
  const preview = $('#labPreview');
  const previewStatus = $('#previewStatus');
  const editorFileName = $('#editorFileName');
  const editorMap = { html: htmlEditor, css: cssEditor, js: jsEditor };
  const fileNameMap = { html: 'index.html', css: 'styles.css', js: 'script.js' };

  exampleSelect.innerHTML = Object.entries(labExamples).map(([id, example]) => `<option value="${id}">${example.name}</option>`).join('');

  function currentLabCode() {
    return { html: htmlEditor.value, css: cssEditor.value, js: jsEditor.value };
  }

  function loadExample(id) {
    const example = labExamples[id];
    if (!example) return;
    state.labExample = id;
    htmlEditor.value = example.html;
    cssEditor.value = example.css;
    jsEditor.value = example.js;
    exampleSelect.value = id;
    runLab();
  }

  function runLab() {
    previewStatus.textContent = 'executando...';
    preview.srcdoc = previewDocument(currentLabCode());
    window.setTimeout(() => { previewStatus.textContent = 'atualizado'; }, 180);
  }

  function selectEditor(editor) {
    state.labEditor = editor;
    $$('.lab-tab').forEach((button) => {
      const active = button.dataset.editor === editor;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    Object.entries(editorMap).forEach(([name, element]) => element.classList.toggle('active', name === editor));
    editorFileName.textContent = fileNameMap[editor];
    editorMap[editor].focus();
  }

  $$('.lab-tab').forEach((button) => button.addEventListener('click', () => selectEditor(button.dataset.editor)));
  exampleSelect.addEventListener('change', () => loadExample(exampleSelect.value));
  $('#runLab').addEventListener('click', runLab);
  $('#resetLab').addEventListener('click', () => { loadExample(state.labExample); showToast('Exemplo restaurado'); });

  Object.values(editorMap).forEach((editor) => {
    editor.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = `${editor.value.slice(0, start)}  ${editor.value.slice(end)}`;
        editor.selectionStart = editor.selectionEnd = start + 2;
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') runLab();
    });
  });
  loadExample('card');
}

categoryFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  applyFilters();
});

technologyGrid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-tech-id]');
  if (card) openTechnology(card.dataset.techId);
});

pathsGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-path-id]');
  if (!button) return;
  const path = learningPaths.find((item) => item.id === button.dataset.pathId);
  if (path) openTechnology(path.steps[0]);
});

searchInput.addEventListener('input', () => { state.query = searchInput.value; renderTechnologies(); });
levelFilter.addEventListener('change', () => { state.level = levelFilter.value; renderTechnologies(); });
clearFiltersButton.addEventListener('click', resetFilters);
drawerClose.addEventListener('click', () => closeDrawer());
drawerBackdrop.addEventListener('click', () => closeDrawer());

drawerContent.addEventListener('click', async (event) => {
  const related = event.target.closest('[data-related-id]');
  if (related) {
    openTechnology(related.dataset.relatedId, { updateHash: true });
    drawerContent.scrollTop = 0;
    return;
  }
  const copyButton = event.target.closest('[data-copy-code]');
  if (copyButton && state.activeTechnology) {
    const technology = getTechnology(state.activeTechnology);
    try {
      await navigator.clipboard.writeText(technology.example.code);
      showToast('Código copiado');
      copyButton.textContent = 'Copiado ✓';
      window.setTimeout(() => { copyButton.textContent = 'Copiar código'; }, 1600);
    } catch {
      showToast('Não foi possível copiar automaticamente');
    }
  }
});

studiedButton.addEventListener('click', () => {
  if (!state.activeTechnology) return;
  if (state.studied.has(state.activeTechnology)) state.studied.delete(state.activeTechnology);
  else state.studied.add(state.activeTechnology);
  saveStudied();
  renderTechnologies();
  renderDrawer(getTechnology(state.activeTechnology));
  showToast(state.studied.has(state.activeTechnology) ? 'Marcada como estudada' : 'Removida do progresso');
});

themeButton.addEventListener('click', () => setTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light'));

document.addEventListener('keydown', (event) => {
  const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
  if (event.key === '/' && !isTyping) {
    event.preventDefault();
    searchInput.focus();
    location.hash = '#biblioteca';
  }
  if (event.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
});

window.addEventListener('hashchange', () => {
  const match = location.hash.match(/^#tecnologia-(.+)$/);
  if (match) openTechnology(match[1], { updateHash: false });
});

function init() {
  initTheme();
  renderFilters();
  renderTechnologies();
  renderPaths();
  updateProgress();
  initLab();
  const match = location.hash.match(/^#tecnologia-(.+)$/);
  if (match) window.setTimeout(() => openTechnology(match[1], { updateHash: false }), 80);
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('./service-worker.js').catch(() => {});
}

init();
