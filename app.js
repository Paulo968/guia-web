import { categories, technologies, learningPaths, labExamples } from './data.js';

const memoryStorage = new Map();

function readStorage(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return memoryStorage.has(key) ? memoryStorage.get(key) : fallback;
  }
}

function writeStorage(key, value) {
  memoryStorage.set(key, value);
  try {
    localStorage.setItem(key, value);
  } catch {
    // O estado continua válido durante a sessão quando o navegador bloqueia o armazenamento.
  }
}

function readStudiedTechnologies() {
  try {
    const parsed = JSON.parse(readStorage('guia-web-studied', '[]'));
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

const state = {
  category: 'Todos',
  level: 'all',
  query: '',
  activeTechnology: null,
  studied: new Set(readStudiedTechnologies()),
  labExample: 'card',
  labEditor: 'html',
  route: { page: 'inicio' }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const views = $$('.app-view');
const appMain = $('#appMain');
const technologyGrid = $('#technologyGrid');
const categoryFilters = $('#categoryFilters');
const resultsCount = $('#resultsCount');
const emptyState = $('#emptyState');
const searchInput = $('#technologySearch');
const levelFilter = $('#levelFilter');
const clearFiltersButton = $('#clearFilters');
const pathsGrid = $('#pathsGrid');
const studiedButton = $('#studiedButton');
const studiedCount = $('#studiedCount');
const technologyCount = $('#technologyCount');
const technologyHeading = $('#technologyHeading');
const technologyContent = $('#technologyContent');
const toast = $('#toast');
const themeButton = $('#themeButton');
const themeIcon = $('#themeIcon');

function normalize(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function escapeHtml(value = '') {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function escapeClosingTag(value = '', tag = 'script') {
  return String(value).replace(new RegExp(`</${tag}`, 'gi'), `<\\/${tag}`);
}

function getTechnology(id) {
  return technologies.find((technology) => technology.id === id);
}

function saveStudied() {
  writeStorage('guia-web-studied', JSON.stringify([...state.studied]));
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
    return matchesCategory && matchesLevel && (!query || searchable.includes(query));
  });
}

function renderTechnologies() {
  const list = filteredTechnologies();
  resultsCount.textContent = `${list.length} ${list.length === 1 ? 'tecnologia encontrada' : 'tecnologias encontradas'}`;
  emptyState.classList.toggle('hidden', list.length > 0);
  technologyGrid.classList.toggle('hidden', list.length === 0);
  technologyGrid.innerHTML = list.map((technology) => `
    <a class="technology-card" href="#/tecnologia/${technology.id}" style="--accent:${technology.accent}" aria-label="Abrir detalhes de ${technology.name}">
      <span class="card-top"><span class="tech-logo" aria-hidden="true">${technology.logo}</span><span class="level-badge">${technology.level}</span></span>
      <h2>${technology.name}</h2>
      <p>${technology.summary}</p>
      <span class="card-footer"><span class="category-label">${technology.category}</span><span class="card-arrow" aria-hidden="true">→</span></span>
      ${state.studied.has(technology.id) ? '<span class="studied-dot" title="Tecnologia estudada"></span>' : ''}
    </a>
  `).join('');
}

function renderPaths() {
  pathsGrid.innerHTML = learningPaths.map((path) => `
    <article class="path-card" style="--path-accent:${path.accent}">
      <span class="path-number">${path.number}</span>
      <h2>${path.title}</h2>
      <p>${path.description}</p>
      <ol class="path-steps">
        ${path.steps.map((id, index) => {
          const technology = getTechnology(id);
          return `<li><span>${String(index + 1).padStart(2, '0')}</span><a href="#/tecnologia/${id}">${technology.name}</a></li>`;
        }).join('')}
      </ol>
      <a class="path-start" href="#/tecnologia/${path.steps[0]}">Começar pela primeira etapa</a>
    </article>
  `).join('');
}

function previewDocument(example) {
  const css = escapeClosingTag(example.css || '', 'style');
  const html = example.html || '';
  const javascript = escapeClosingTag(example.js || '', 'script');

  const errorHandler = `
    (() => {
      const showError = (message) => {
        const previous = document.querySelector('[data-guia-error]');
        if (previous) previous.remove();
        const errorBox = document.createElement('pre');
        errorBox.dataset.guiaError = 'true';
        errorBox.style.cssText = 'margin:16px;padding:12px;border-radius:10px;background:#fee2e2;color:#991b1b;font:12px/1.5 monospace;white-space:pre-wrap;text-align:left';
        errorBox.textContent = 'Erro no JavaScript: ' + message;
        document.body.append(errorBox);
      };

      window.__guiaShowError = showError;
      window.addEventListener('error', (event) => {
        showError(event.message || 'erro desconhecido');
        event.preventDefault();
      });
      window.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason?.message || String(event.reason || 'promessa rejeitada');
        showError(reason);
        event.preventDefault();
      });
    })();
  `;

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script>${errorHandler}<\/script>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    try {
      ${javascript}
    } catch (error) {
      window.__guiaShowError(error?.message || String(error));
    }
  <\/script>
</body>
</html>`;
}

function renderTechnologyPage(technology) {
  state.activeTechnology = technology.id;
  const isStudied = state.studied.has(technology.id);
  document.documentElement.style.setProperty('--detail-accent', technology.accent);
  technologyHeading.innerHTML = `
    <span class="tech-logo technology-logo" style="--accent:${technology.accent}" aria-hidden="true">${technology.logo}</span>
    <div><p class="technology-meta">${technology.category} · ${technology.level}</p><h1 id="technologyPageTitle">${technology.name}</h1><p>${technology.summary}</p></div>
  `;
  studiedButton.textContent = isStudied ? '✓ Marcada como estudada' : 'Marcar como estudada';
  studiedButton.classList.toggle('active', isStudied);
  studiedButton.setAttribute('aria-pressed', String(isStudied));

  technologyContent.innerHTML = `
    <section class="detail-hero">
      <span class="detail-label">O que é</span>
      <h2>${technology.definition}</h2>
      <div class="analogy-box"><span aria-hidden="true">💡</span><div><strong>Analogia simples</strong><p>${technology.analogy}</p></div></div>
    </section>

    <section class="detail-section">
      <div class="detail-grid">
        <article class="info-card"><strong>Categoria</strong><p>${technology.category}</p></article>
        <article class="info-card"><strong>Nível</strong><p>${technology.level}</p></article>
        <article class="info-card"><strong>Pré-requisitos</strong><p>${technology.prerequisites.join(', ')}</p></article>
        <article class="info-card"><strong>Exemplo</strong><p>${technology.example.title}</p></article>
      </div>
    </section>

    <section class="detail-columns">
      <article class="detail-section"><h2>Quando esta tecnologia é usada</h2><ul class="bullet-list">${technology.useCases.map((item) => `<li>${item}</li>`).join('')}</ul></article>
      <article class="detail-section"><h2>O que ela não resolve sozinha</h2><ul class="bullet-list negative">${technology.notFor.map((item) => `<li>${item}</li>`).join('')}</ul></article>
    </section>

    <section class="detail-section example-section">
      <div class="detail-section-heading"><div><span class="detail-label">Código + resultado</span><h2>${technology.example.title}</h2></div><button class="copy-button" type="button" data-copy-code>Copiar código</button></div>
      <div class="example-workspace">
        <div class="code-example"><div class="code-example-header"><span>${technology.example.language}</span></div><pre><code>${escapeHtml(technology.example.code)}</code></pre></div>
        <div class="example-preview"><div class="example-preview-label">Resultado visual</div><iframe title="Resultado do exemplo de ${technology.name}" sandbox="allow-scripts"></iframe></div>
      </div>
    </section>

    <section class="detail-section related-section"><h2>Continue explorando</h2><div class="related-list">${technology.related.map((id) => {
      const related = getTechnology(id);
      return `<a class="related-button" href="#/tecnologia/${id}">${related.name} <span aria-hidden="true">→</span></a>`;
    }).join('')}</div></section>
  `;

  const preview = $('.example-preview iframe', technologyContent);
  if (preview) preview.srcdoc = previewDocument(technology.example);
}

function legacyRoute(raw) {
  const aliases = {
    inicio: 'inicio',
    biblioteca: 'biblioteca',
    trilhas: 'trilhas',
    laboratorio: 'laboratorio'
  };
  if (aliases[raw]) return { page: aliases[raw] };
  const technologyMatch = raw.match(/^tecnologia-(.+)$/);
  if (technologyMatch) return { page: 'tecnologia', id: technologyMatch[1] };
  return null;
}

function parseRoute() {
  const rawHash = location.hash.replace(/^#/, '');
  if (!rawHash) return { page: 'inicio' };
  if (!rawHash.startsWith('/')) return legacyRoute(rawHash) || { page: 'inicio' };
  const [page, id] = rawHash.slice(1).split('/');
  if (page === 'tecnologia' && getTechnology(id)) return { page, id };
  if (['inicio', 'biblioteca', 'trilhas', 'laboratorio'].includes(page)) return { page };
  return { page: 'inicio' };
}

function canonicalHash(route) {
  return route.page === 'tecnologia' ? `#/tecnologia/${route.id}` : `#/${route.page}`;
}

function updateNavigation(route) {
  const activePage = route.page === 'tecnologia' ? 'biblioteca' : route.page;
  $$('[data-route-link]').forEach((link) => {
    const active = link.dataset.routeLink === activePage;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function updateDocumentTitle(route) {
  if (route.page === 'tecnologia') {
    document.title = `${getTechnology(route.id).name} — Guia Web Definitivo`;
    return;
  }
  const titles = { inicio: 'Guia Web Definitivo — Aprenda vendo', biblioteca: 'Biblioteca — Guia Web Definitivo', trilhas: 'Trilhas — Guia Web Definitivo', laboratorio: 'Laboratório — Guia Web Definitivo' };
  document.title = titles[route.page];
}

function renderRoute({ moveFocus = false } = {}) {
  const route = parseRoute();
  state.route = route;
  const canonical = canonicalHash(route);
  if (location.hash !== canonical) history.replaceState(null, '', canonical);

  views.forEach((view) => {
    const active = view.dataset.view === route.page;
    view.hidden = !active;
    view.setAttribute('aria-hidden', String(!active));
  });

  if (route.page === 'tecnologia') renderTechnologyPage(getTechnology(route.id));
  else state.activeTechnology = null;

  document.body.dataset.route = route.page;
  updateNavigation(route);
  updateDocumentTitle(route);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  if (moveFocus) {
    window.setTimeout(() => {
      const heading = $(`[data-view="${route.page}"] h1`);
      (heading || appMain).setAttribute('tabindex', '-1');
      (heading || appMain).focus({ preventScroll: true });
    }, 30);
  }
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
  writeStorage('guia-web-theme', theme);
}

function initTheme() {
  const stored = readStorage('guia-web-theme');
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  setTheme(['light', 'dark'].includes(stored) ? stored : preferred);
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

  function runLab() {
    previewStatus.textContent = 'executando...';
    preview.srcdoc = previewDocument(currentLabCode());
    window.clearTimeout(runLab.timer);
    runLab.timer = window.setTimeout(() => { previewStatus.textContent = 'atualizado'; }, 180);
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
        editor.editorSelectionStart = editor.editorSelectionEnd = start + 2;
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

searchInput.addEventListener('input', () => { state.query = searchInput.value; renderTechnologies(); });
levelFilter.addEventListener('change', () => { state.level = levelFilter.value; renderTechnologies(); });
clearFiltersButton.addEventListener('click', resetFilters);
themeButton.addEventListener('click', () => setTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light'));

studiedButton.addEventListener('click', () => {
  if (!state.activeTechnology) return;
  if (state.studied.has(state.activeTechnology)) state.studied.delete(state.activeTechnology);
  else state.studied.add(state.activeTechnology);
  saveStudied();
  renderTechnologies();
  renderTechnologyPage(getTechnology(state.activeTechnology));
  showToast(state.studied.has(state.activeTechnology) ? 'Marcada como estudada' : 'Removida do progresso');
});

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Cópia não suportada');
}

technologyContent.addEventListener('click', async (event) => {
  const copyButton = event.target.closest('[data-copy-code]');
  if (!copyButton || !state.activeTechnology) return;
  try {
    await copyText(getTechnology(state.activeTechnology).example.code);
    showToast('Código copiado');
    copyButton.textContent = 'Copiado ✓';
    window.setTimeout(() => { copyButton.textContent = 'Copiar código'; }, 1600);
  } catch {
    showToast('Não foi possível copiar automaticamente');
  }
});

document.addEventListener('keydown', (event) => {
  const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
  if (event.key === '/' && !isTyping) {
    event.preventDefault();
    location.hash = '#/biblioteca';
    window.setTimeout(() => searchInput.focus(), 50);
  }
  if (event.key === 'Escape' && state.route.page === 'tecnologia') location.hash = '#/biblioteca';
});

window.addEventListener('hashchange', () => renderRoute({ moveFocus: true }));

function init() {
  initTheme();
  renderFilters();
  renderTechnologies();
  renderPaths();
  updateProgress();
  initLab();
  renderRoute();
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('./service-worker.js').catch((error) => {
      console.warn('Não foi possível registrar o modo offline:', error);
    });
  }
}

init();
