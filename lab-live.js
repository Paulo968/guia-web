const setupLiveLaboratory = () => {
  const editors = [...document.querySelectorAll('.code-editor')];
  const tabs = [...document.querySelectorAll('.lab-tab')];
  const runButton = document.querySelector('#runLab');
  const viewResultButton = document.querySelector('#viewResult');
  const previewPane = document.querySelector('.preview-pane');
  const previewStatus = document.querySelector('#previewStatus');
  const editorHelp = document.querySelector('#editorHelp');

  if (!editors.length || !runButton || !previewStatus || !editorHelp) return;

  const helpByEditor = {
    html: 'HTML cria e organiza o conteúdo: títulos, textos, botões, imagens e formulários.',
    css: 'CSS muda a aparência: cores, tamanhos, espaçamentos, posições e animações.',
    js: 'JavaScript cria comportamento. Depois da atualização, teste os botões dentro do resultado.'
  };

  let updateTimer = null;

  const updateEditorHelp = (editorName) => {
    editorHelp.textContent = helpByEditor[editorName] || helpByEditor.html;
  };

  const scheduleUpdate = () => {
    window.clearTimeout(updateTimer);
    previewStatus.textContent = 'aguardando pausa...';
    previewStatus.classList.add('is-updating');

    updateTimer = window.setTimeout(() => {
      runButton.click();
      previewStatus.classList.remove('is-updating');
    }, 420);
  };

  editors.forEach((editor) => {
    editor.addEventListener('input', scheduleUpdate);
    editor.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') window.setTimeout(scheduleUpdate, 0);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => updateEditorHelp(tab.dataset.editor));
  });

  runButton.textContent = 'Atualizar agora ▶';
  runButton.setAttribute('title', 'Atualiza o resultado imediatamente. Atalho: Ctrl + Enter.');

  viewResultButton?.addEventListener('click', () => {
    previewPane?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateEditorHelp(document.querySelector('.lab-tab.active')?.dataset.editor || 'html');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.requestAnimationFrame(setupLiveLaboratory), { once: true });
} else {
  window.requestAnimationFrame(setupLiveLaboratory);
}
