import './data-patch.js';

function repairStoredPreferences() {
  try {
    const storedProgress = localStorage.getItem('guia-web-studied');
    if (storedProgress !== null) {
      const parsedProgress = JSON.parse(storedProgress);
      const isValid = Array.isArray(parsedProgress) && parsedProgress.every((item) => typeof item === 'string');
      if (!isValid) localStorage.removeItem('guia-web-studied');
    }

    const storedTheme = localStorage.getItem('guia-web-theme');
    if (storedTheme !== null && !['light', 'dark'].includes(storedTheme)) {
      localStorage.removeItem('guia-web-theme');
    }
  } catch {
    // O app.js possui um armazenamento temporário de reserva para ambientes restritos.
  }
}

function enhanceAccessibilityAndUi() {
  const searchInput = document.querySelector('#technologySearch');
  searchInput?.setAttribute('aria-label', 'Pesquisar tecnologias');

  const resultsCount = document.querySelector('#resultsCount');
  resultsCount?.setAttribute('role', 'status');
  resultsCount?.setAttribute('aria-live', 'polite');

  const previewStatus = document.querySelector('#previewStatus');
  previewStatus?.setAttribute('role', 'status');
  previewStatus?.setAttribute('aria-live', 'polite');

  const featureLabels = [...document.querySelectorAll('.lab-features span')];
  if (featureLabels[2]) featureLabels[2].textContent = '✓ Isolado da página principal';

  const tabs = [...document.querySelectorAll('.lab-tab')];
  const syncTabs = () => {
    tabs.forEach((tab) => {
      const editorName = tab.dataset.editor;
      const editor = document.querySelector(`#${editorName}Editor`);
      const active = tab.classList.contains('active');

      if (editor) {
        tab.setAttribute('aria-controls', editor.id);
        editor.setAttribute('role', 'tabpanel');
        editor.setAttribute('aria-labelledby', tab.id);
        editor.setAttribute('aria-hidden', String(!active));
      }

      tab.tabIndex = active ? 0 : -1;
    });
  };

  tabs.forEach((tab, index) => {
    if (!tab.id) tab.id = `labTab${tab.dataset.editor}`;
    tab.addEventListener('click', () => window.setTimeout(syncTabs, 0));
    tab.addEventListener('keydown', (event) => {
      let targetIndex = null;
      if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = tabs.length - 1;
      if (targetIndex === null) return;

      event.preventDefault();
      tabs[targetIndex].click();
      tabs[targetIndex].focus();
    });
  });
  syncTabs();

  const studiedCount = document.querySelector('#studiedCount');
  const updateStudiedGrammar = () => {
    const strong = studiedCount?.parentElement;
    if (!strong) return;
    const number = Number(studiedCount.textContent || 0);
    const labelNode = [...strong.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (labelNode) labelNode.textContent = number === 1 ? ' estudada' : ' estudadas';
  };

  if (studiedCount) {
    new MutationObserver(updateStudiedGrammar).observe(studiedCount, {
      childList: true,
      characterData: true,
      subtree: true
    });
    updateStudiedGrammar();
  }

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const updateThemeColor = () => {
    themeMeta?.setAttribute('content', document.documentElement.classList.contains('light') ? '#f6f8ff' : '#081126');
  };

  new MutationObserver(updateThemeColor).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
  updateThemeColor();
}

function showStartupError(error) {
  console.error('Falha ao iniciar o Guia Web:', error);
  const message = document.createElement('div');
  message.setAttribute('role', 'alert');
  message.style.cssText = 'margin:24px;padding:18px;border:1px solid #fb7185;border-radius:14px;background:#2b1320;color:#fff;font:16px/1.5 system-ui';
  message.textContent = 'Não foi possível iniciar o Guia Web. Atualize a página. Se o problema continuar, limpe o cache do site.';
  document.body.prepend(message);
}

async function startGuide() {
  repairStoredPreferences();
  await import('./app.js');
  await import('./lab-live.js');
  enhanceAccessibilityAndUi();
}

startGuide().catch(showStartupError);
