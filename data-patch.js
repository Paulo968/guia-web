import { technologies, learningPaths } from './data.js';

const changes = {
  html: {
    analogy: 'É a fundação, as paredes e a divisão dos cômodos. Define o que existe no prédio e o significado de cada espaço.',
    searchTerms: 'site página texto botão formulário estrutura fundação paredes cômodos conteúdo semântica'
  },
  css: {
    analogy: 'É o projeto visual, a pintura, a iluminação e a decoração: define aparência, posição e adaptação do espaço.',
    searchTerms: 'design aparência pintura iluminação decoração cor layout responsivo mobile animação estilo bonito'
  },
  javascript: {
    definition: 'JavaScript é uma linguagem de programação executada pelos navegadores e também por ambientes como Node.js. No navegador, ela responde a eventos, altera a interface e se comunica com APIs.',
    analogy: 'É a eletricidade, os elevadores e os mecanismos automáticos. Percebe eventos, toma decisões e faz o prédio responder.',
    searchTerms: 'elétrica elevador mecanismo clique funcionar lógica cálculo api interação jogo dinâmica comportamento'
  },
  typescript: {
    definition: 'TypeScript adiciona verificação estática de tipos ao JavaScript. Os tipos são analisados antes da execução e removidos quando o código é convertido em JavaScript.',
    analogy: 'É o conjunto de normas e etiquetas técnicas da obra: deixa claro o que cabe em cada lugar e acusa incompatibilidades antes da entrega.'
  },
  react: {
    definition: 'React é uma biblioteca JavaScript para construir interfaces com componentes. Quando o estado muda, o React calcula e aplica as atualizações necessárias na tela.',
    analogy: 'É um sistema de peças pré-fabricadas. Botões, cards, menus e janelas são criados uma vez e reutilizados em várias partes da construção.'
  },
  vite: {
    definition: 'Vite é uma ferramenta de build para projetos web modernos. Ela oferece um servidor de desenvolvimento rápido e um comando que gera arquivos otimizados para produção.',
    analogy: 'É a oficina com máquinas prontas: liga rapidamente o ambiente de trabalho e empacota a construção em uma versão otimizada para entrega.',
    related: ['react', 'typescript', 'netlify', 'vercel']
  },
  tailwind: {
    definition: 'Tailwind CSS é um framework CSS baseado em classes utilitárias. Ele analisa as classes usadas no projeto e gera os estilos necessários.',
    analogy: 'É um catálogo de peças de acabamento padronizadas: você combina medidas de cor, espaço, tamanho e alinhamento diretamente na construção.'
  },
  node: {
    definition: 'Node.js é um ambiente de execução JavaScript gratuito, de código aberto e multiplataforma que funciona fora do navegador.',
    analogy: 'É a sala de máquinas e a equipe interna. Executa tarefas escondidas do visitante, processa pedidos e mantém serviços funcionando.'
  },
  'api-rest': {
    definition: 'REST é um estilo de arquitetura para APIs. Uma API RESTful representa recursos por URLs e usa a semântica do HTTP, com métodos como GET, POST, PATCH e DELETE.',
    analogy: 'É a recepção e o sistema de comunicação: recebe uma solicitação, encaminha ao setor responsável e devolve uma resposta padronizada.',
    notFor: ['Não é o banco de dados', 'Nem toda API HTTP segue REST', 'Precisa de autenticação, autorização e validação', 'Não deve expor dados privados sem regras']
  },
  postgresql: {
    definition: 'PostgreSQL é um sistema gerenciador de banco de dados objeto-relacional, de código aberto, que usa e amplia a linguagem SQL.',
    analogy: 'É o arquivo central da construção, com fichários relacionados e regras que evitam registros perdidos, duplicados ou misturados.'
  },
  supabase: {
    definition: 'Supabase é uma plataforma de backend cujo núcleo é o PostgreSQL. Ela reúne banco de dados, autenticação, armazenamento de arquivos, APIs, tempo real e funções de borda.',
    analogy: 'É uma infraestrutura interna já equipada com arquivo, portaria, depósito e comunicação. Você ainda define as regras de acesso de cada área.',
    useCases: ['Banco PostgreSQL gerenciado', 'Login e controle de acesso', 'Upload de imagens e documentos', 'Atualizações em tempo real', 'Funções executadas no backend']
  },
  'git-github': {
    definition: 'Git é um sistema distribuído de controle de versão. GitHub hospeda repositórios Git e acrescenta colaboração, revisões, issues e automações.',
    analogy: 'Git é o diário e a máquina do tempo da obra; GitHub é o arquivo onde ficam plantas, versões, propostas de mudança e revisões.',
    related: ['netlify', 'vercel', 'vite', 'playwright'],
    searchTerms: 'plantas diário máquina tempo versionar código salvar histórico branch commit pull request repositório'
  },
  vercel: {
    definition: 'Vercel é uma plataforma de deploy para aplicações web. Ela conecta ao Git, executa o build, cria versões de pré-visualização e publica a versão de produção.',
    analogy: 'É uma equipe de publicação com vitrine própria: recebe o projeto, executa o build, cria previews e mantém a versão aprovada disponível na internet.',
    related: ['git-github', 'netlify', 'vite', 'next']
  },
  playwright: {
    definition: 'Playwright é uma biblioteca e um executor de testes que automatiza navegadores baseados em Chromium, Firefox e WebKit.',
    analogy: 'É o inspetor da obra: percorre o sistema como um usuário real, testa portas, formulários e caminhos e avisa quando algo deixa de funcionar.',
    useCases: ['Testar login e checkout', 'Validar fluxos em diferentes navegadores', 'Verificar responsividade', 'Criar automações autorizadas', 'Capturar screenshots, vídeos e relatórios']
  },
  next: {
    definition: 'Next.js é um framework React para construir aplicações web full-stack. Ele organiza páginas, rotas, renderização no servidor e no cliente, cache e recursos de produção.',
    analogy: 'React fornece as peças; Next.js atua como projeto executivo e engenheiro-chefe, organizando rotas, servidor, cache e formas de montar a aplicação.',
    notFor: ['Exige compreender React primeiro', 'Pode ser excessivo para uma página simples', 'Seus recursos de backend não substituem todo tipo de backend', 'Ainda precisa de banco, segurança e regras bem projetadas'],
    related: ['react', 'typescript', 'netlify', 'vercel']
  },
  'ai-api': {
    definition: 'Uma API de inteligência artificial permite enviar uma entrada a um modelo hospedado e receber texto, dados estruturados, imagem, áudio ou outra saída, conforme o serviço utilizado.'
  }
};

for (const technology of technologies) {
  if (changes[technology.id]) Object.assign(technology, changes[technology.id]);
}

const nextTechnology = technologies.find((technology) => technology.id === 'next');
if (nextTechnology) {
  nextTechnology.example.language = 'Next.js / TSX';
  nextTechnology.example.code = `type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProdutoPage({ params }: PageProps) {
  const { id } = await params;
  const produto = await buscarProduto(id);

  return <main><h1>{produto.nome}</h1><p>R$ {produto.preco}</p></main>;
}`;
}

const playwrightTechnology = technologies.find((technology) => technology.id === 'playwright');
if (playwrightTechnology) {
  playwrightTechnology.example.code = `import { test, expect } from '@playwright/test';

test('usuário entra no painel', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('E-mail').fill('teste@email.com');
  await page.getByLabel('Senha').fill('senha-segura');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL('/painel');
});`;
}

const aiTechnology = technologies.find((technology) => technology.id === 'ai-api');
if (aiTechnology) {
  aiTechnology.example.language = 'Pseudocódigo JavaScript';
  aiTechnology.example.title = 'Fluxo seguro no backend';
}

if (!technologies.some((technology) => technology.id === 'netlify')) {
  const vercelIndex = technologies.findIndex((technology) => technology.id === 'vercel');
  const insertAt = vercelIndex >= 0 ? vercelIndex : technologies.length;

  technologies.splice(insertAt, 0, {
    id: 'netlify',
    name: 'Netlify',
    logo: 'N',
    category: 'Ferramentas',
    level: 'Básico',
    accent: '#32e6a1',
    summary: 'Publica projetos web, automatiza deploys e oferece domínio, HTTPS, previews, formulários e funções.',
    definition: 'Netlify é uma plataforma de deploy para projetos web. Ela pode conectar ao Git, executar o build, distribuir os arquivos e manter o histórico das versões publicadas.',
    analogy: 'É a equipe que recebe as plantas aprovadas, constrói o pacote final, abre o prédio ao público e mantém o endereço funcionando. Uma reforma vira um novo deploy no mesmo projeto.',
    useCases: ['Publicar sites estáticos e aplicações React/Vite', 'Atualizar produção automaticamente pelo GitHub', 'Criar deploy previews e restaurar versões anteriores', 'Configurar domínio, HTTPS, formulários e funções'],
    notFor: ['Não guarda o histórico do código como o GitHub', 'Não substitui banco de dados nem regras de negócio', 'Build e variáveis de ambiente precisam estar configurados corretamente'],
    prerequisites: ['Projeto web', 'Git ou GitHub recomendado'],
    related: ['git-github', 'vite', 'vercel', 'react'],
    searchTerms: 'netlify publicar site deploy domínio internet preview hospedagem produção react vite github atualizar projeto',
    example: {
      title: 'Atualização automática pelo GitHub',
      language: 'Fluxo',
      code: `1. Alterar o código
2. Enviar a mudança ao GitHub
3. Netlify executa o build
4. Preview ou produção é atualizado
5. O endereço principal continua o mesmo`,
      html: `<div class="netlify-flow"><span>GitHub</span><i>→</i><span>Build</span><i>→</i><strong>Netlify</strong><small>mesmo projeto · nova versão</small></div>`,
      css: `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#ecfdf5;font-family:Arial}.netlify-flow{width:min(440px,90%);display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;padding:25px;border:1px solid #a7f3d0;border-radius:20px;background:#fff;box-shadow:0 18px 45px #10b98122}.netlify-flow span,.netlify-flow strong{padding:10px 13px;border-radius:11px;background:#d1fae5;color:#065f46;font-size:13px}.netlify-flow strong{background:#052e2b;color:#5eead4}.netlify-flow i{color:#10b981}.netlify-flow small{flex-basis:100%;text-align:center;color:#64748b;font-size:11px}`,
      js: ''
    }
  });
}

const firstPath = learningPaths.find((path) => path.id === 'primeiro-site');
if (firstPath) {
  firstPath.description = 'Aprenda a base, preserve o código e publique novas versões no mesmo projeto sem pular etapas.';
  firstPath.steps = ['html', 'css', 'javascript', 'git-github', 'netlify'];
}
