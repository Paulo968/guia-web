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
    analogy: 'É a eletricidade, os elevadores e os mecanismos automáticos. Percebe eventos, toma decisões e faz o prédio responder.',
    searchTerms: 'elétrica elevador mecanismo clique funcionar lógica cálculo api interação jogo dinâmica comportamento'
  },
  typescript: {
    analogy: 'É o conjunto de normas e etiquetas técnicas da obra: deixa claro o que cabe em cada lugar e acusa incompatibilidades antes da entrega.'
  },
  react: {
    analogy: 'É um sistema de peças pré-fabricadas. Botões, cards, menus e janelas são criados uma vez e reutilizados em várias partes da construção.'
  },
  vite: {
    analogy: 'É a oficina com máquinas prontas: liga rapidamente o ambiente de trabalho e empacota a construção em uma versão otimizada para entrega.',
    related: ['react', 'typescript', 'netlify', 'vercel']
  },
  node: {
    analogy: 'É a sala de máquinas e a equipe interna. Executa tarefas escondidas do visitante, processa pedidos e mantém serviços funcionando.'
  },
  'api-rest': {
    analogy: 'É a recepção e o sistema de comunicação: recebe uma solicitação, encaminha ao setor responsável e devolve uma resposta padronizada.'
  },
  postgresql: {
    analogy: 'É o arquivo central da construção, com fichários relacionados e regras que evitam registros perdidos, duplicados ou misturados.'
  },
  supabase: {
    analogy: 'É uma infraestrutura interna já equipada com arquivo, portaria, depósito e comunicação. Você ainda define as regras de acesso de cada área.'
  },
  'git-github': {
    analogy: 'Git é o diário e a máquina do tempo da obra; GitHub é o arquivo onde ficam plantas, versões, propostas de mudança e revisões.',
    related: ['netlify', 'vercel', 'vite', 'playwright'],
    searchTerms: 'plantas diário máquina tempo versionar código salvar histórico branch commit pull request repositório'
  },
  vercel: {
    analogy: 'É uma equipe de publicação com vitrine própria: recebe o projeto, executa o build, cria previews e mantém a versão aprovada disponível na internet.',
    related: ['git-github', 'netlify', 'vite', 'next']
  },
  playwright: {
    analogy: 'É o inspetor da obra: percorre o sistema como um usuário real, testa portas, formulários e caminhos e avisa quando algo deixa de funcionar.'
  },
  next: {
    analogy: 'React fornece as peças; Next.js atua como projeto executivo e engenheiro-chefe, organizando rotas, servidor, cache e formas de montar a aplicação.',
    related: ['react', 'typescript', 'netlify', 'vercel']
  }
};

for (const technology of technologies) {
  if (changes[technology.id]) Object.assign(technology, changes[technology.id]);
}

if (!technologies.some((technology) => technology.id === 'netlify')) {
  technologies.splice(
    technologies.findIndex((technology) => technology.id === 'vercel'),
    0,
    {
      id: 'netlify',
      name: 'Netlify',
      logo: 'N',
      category: 'Ferramentas',
      level: 'Básico',
      accent: '#32e6a1',
      summary: 'Publica projetos web, automatiza deploys e oferece domínio, HTTPS, previews, formulários e funções.',
      definition: 'Netlify é uma plataforma de deploy para projetos web. Ela pode conectar ao Git, executar o build, distribuir os arquivos globalmente e manter cada versão publicada.',
      analogy: 'É a equipe que recebe as plantas aprovadas, constrói o pacote final, abre o prédio ao público e mantém o endereço funcionando. Uma reforma vira um novo deploy no mesmo projeto.',
      useCases: ['Publicar sites estáticos e aplicações React/Vite', 'Atualizar produção automaticamente pelo GitHub', 'Criar deploy previews e voltar a versões anteriores', 'Configurar domínio, HTTPS, formulários e funções'],
      notFor: ['Não guarda o histórico do código como o GitHub', 'Não substitui banco de dados nem regras de negócio', 'Build e variáveis de ambiente precisam estar configurados corretamente'],
      prerequisites: ['Projeto web', 'GitHub recomendado'],
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
    }
  );
}

const firstPath = learningPaths.find((path) => path.id === 'primeiro-site');
if (firstPath) {
  firstPath.description = 'Aprenda a base, preserve o código e publique novas versões no mesmo projeto sem pular etapas.';
  firstPath.steps = ['html', 'css', 'javascript', 'git-github', 'netlify'];
}
