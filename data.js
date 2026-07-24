export const categories = ['Todos', 'Fundamentos', 'Frontend', 'Backend e dados', 'Ferramentas', 'Avançado'];

const example = (title, language, code, html, css, js = '') => ({ title, language, code, html, css, js });

export const technologies = [
  {
    id: 'html', name: 'HTML', logo: 'HTML', category: 'Fundamentos', level: 'Básico', accent: '#f97316',
    summary: 'Organiza títulos, textos, imagens, links, formulários e todo o conteúdo da página.',
    definition: 'HTML é a linguagem de marcação que descreve a estrutura e o significado do conteúdo exibido pelo navegador.',
    analogy: 'É o esqueleto e a divisão dos cômodos de uma casa. Ele diz o que existe e onde cada parte começa e termina.',
    useCases: ['Criar títulos, parágrafos e links', 'Montar formulários e tabelas', 'Organizar menus, páginas e artigos', 'Dar significado ao conteúdo para acessibilidade e buscadores'],
    notFor: ['Não define sozinho um visual sofisticado', 'Não cria regras complexas ou lógica de negócio', 'Não substitui CSS nem JavaScript'],
    prerequisites: ['Nenhum'], related: ['css', 'javascript', 'react'],
    searchTerms: 'site página texto botão formulário estrutura esqueleto conteúdo semântica',
    example: example('Card de apresentação', 'HTML', `<article class="perfil">
  <span>👋 Bem-vindo</span>
  <h1>Paulo Zaqueu</h1>
  <p>Construindo soluções para problemas reais.</p>
  <a href="#projetos">Conhecer projetos</a>
</article>`, `<article class="perfil"><span>👋 Bem-vindo</span><h1>Paulo Zaqueu</h1><p>Construindo soluções para problemas reais.</p><a href="#">Conhecer projetos</a></article>`, `body{font-family:Arial;display:grid;place-items:center;min-height:100vh;margin:0;background:#f5f3ff}.perfil{max-width:340px;padding:28px;border-radius:20px;background:#fff;box-shadow:0 18px 50px #6d28d933}.perfil span{color:#7c3aed;font-weight:700}.perfil h1{margin:12px 0 8px}.perfil p{color:#64748b;line-height:1.5}.perfil a{display:inline-block;margin-top:12px;padding:11px 15px;border-radius:10px;color:#fff;background:#7c3aed;text-decoration:none;font-weight:700}`)
  },
  {
    id: 'css', name: 'CSS', logo: 'CSS', category: 'Fundamentos', level: 'Básico', accent: '#38bdf8',
    summary: 'Controla cores, tamanhos, fontes, espaçamento, animações e responsividade.',
    definition: 'CSS é a linguagem de estilos que transforma a estrutura HTML em uma interface visual organizada e adaptável.',
    analogy: 'É a decoração, a roupa e o projeto visual da casa: cores, materiais, posição dos móveis e adaptação para espaços diferentes.',
    useCases: ['Criar layouts para celular e computador', 'Definir cores, fontes e espaçamentos', 'Fazer animações e transições', 'Organizar elementos com Flexbox e Grid'],
    notFor: ['Não armazena dados', 'Não processa pagamentos', 'Interatividade complexa exige JavaScript'],
    prerequisites: ['HTML'], related: ['html', 'tailwind', 'javascript'],
    searchTerms: 'design aparência cor layout responsivo mobile animação estilo bonito',
    example: example('Botão com interação visual', 'CSS', `.botao {
  padding: 14px 22px;
  border: 0;
  border-radius: 12px;
  color: white;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  box-shadow: 0 12px 28px #7c3aed55;
  transition: transform .2s ease;
}
.botao:hover { transform: translateY(-3px) scale(1.03); }`, `<button class="botao">Passe o mouse aqui</button>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#f8fafc;font-family:Arial}.botao{padding:14px 22px;border:0;border-radius:12px;color:#fff;background:linear-gradient(135deg,#7c3aed,#2563eb);box-shadow:0 12px 28px #7c3aed55;transition:transform .2s ease;font-weight:800;cursor:pointer}.botao:hover{transform:translateY(-3px) scale(1.03)}`)
  },
  {
    id: 'javascript', name: 'JavaScript', logo: 'JS', category: 'Fundamentos', level: 'Básico', accent: '#facc15',
    summary: 'Dá comportamento à página: cliques, cálculos, validações, dados e comunicação com APIs.',
    definition: 'JavaScript é a linguagem de programação nativa do navegador. Ela lê eventos, toma decisões e altera a interface em tempo real.',
    analogy: 'É o cérebro e o sistema elétrico da casa. Percebe que alguém apertou o interruptor e decide acender a luz.',
    useCases: ['Responder a cliques e formulários', 'Consumir APIs e mostrar dados', 'Criar jogos e interfaces dinâmicas', 'Validar informações antes do envio'],
    notFor: ['Não substitui uma boa estrutura HTML', 'Não deve guardar segredos no navegador', 'Projetos grandes precisam de organização e testes'],
    prerequisites: ['HTML', 'CSS básico'], related: ['typescript', 'react', 'node'],
    searchTerms: 'clique funcionar lógica cálculo api interação jogo dinâmica comportamento',
    example: example('Contador interativo', 'JavaScript', `const numero = document.querySelector('#numero');
const botao = document.querySelector('#somar');
let total = 0;
botao.addEventListener('click', () => {
  total += 1;
  numero.textContent = total;
});`, `<main class="contador"><span>Cliques</span><strong id="numero">0</strong><button id="somar">Somar +1</button></main>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#fefce8;font-family:Arial}.contador{text-align:center;padding:28px 40px;border:1px solid #fde68a;border-radius:22px;background:#fff}.contador span{display:block;color:#a16207;font-weight:700}.contador strong{display:block;margin:12px;font-size:52px}.contador button{padding:12px 18px;border:0;border-radius:11px;background:#eab308;color:#422006;font-weight:900;cursor:pointer}`, `const numero=document.querySelector('#numero');let total=0;document.querySelector('#somar').addEventListener('click',()=>{numero.textContent=++total});`)
  },
  {
    id: 'typescript', name: 'TypeScript', logo: 'TS', category: 'Fundamentos', level: 'Intermediário', accent: '#3b82f6',
    summary: 'Adiciona tipos ao JavaScript para detectar erros mais cedo e organizar sistemas maiores.',
    definition: 'TypeScript é uma extensão do JavaScript que permite declarar formatos de dados, parâmetros e retornos. Depois ele é convertido em JavaScript.',
    analogy: 'É como etiquetar caixas antes da mudança: você sabe o que cabe em cada uma e evita colocar um copo frágil na caixa de ferramentas.',
    useCases: ['Modelar dados de clientes e pedidos', 'Evitar propriedades escritas incorretamente', 'Melhorar autocomplete e manutenção', 'Trabalhar em projetos grandes ou em equipe'],
    notFor: ['O navegador não executa TypeScript diretamente', 'Não elimina a necessidade de testes', 'Pode ser exagero para uma página minúscula'],
    prerequisites: ['JavaScript'], related: ['javascript', 'react', 'vite'],
    searchTerms: 'tipo erro interface projeto grande autocomplete segurança código',
    example: example('Dados de um produto', 'TypeScript', `type Produto = {
  nome: string;
  preco: number;
  disponivel: boolean;
};
function exibirProduto(produto: Produto): string {
  return produto.disponivel
    ? produto.nome + ' — R$ ' + produto.preco.toFixed(2)
    : produto.nome + ' — indisponível';
}`, `<div class="produto"><span>Produto validado pelo TypeScript</span><h2>Açaí 500 ml</h2><strong>R$ 18,00</strong><small>✓ disponível</small></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#eff6ff;font-family:Arial}.produto{width:280px;padding:25px;border-radius:20px;background:#fff;box-shadow:0 16px 40px #3b82f622}.produto span{color:#2563eb;font-size:12px;font-weight:800}.produto h2{margin:14px 0 8px}.produto strong{display:block;font-size:24px}.produto small{display:block;margin-top:10px;color:#059669}`)
  },
  {
    id: 'react', name: 'React', logo: '⚛', category: 'Frontend', level: 'Intermediário', accent: '#22d3ee',
    summary: 'Constrói interfaces modernas com componentes reutilizáveis e atualização automática de estado.',
    definition: 'React é uma biblioteca JavaScript para criar interfaces divididas em componentes. Quando os dados mudam, a parte necessária da tela é atualizada.',
    analogy: 'É uma caixa de peças de montar. Você cria Botão, Card, Menu e Modal uma vez e combina essas peças em várias telas.',
    useCases: ['Painéis administrativos', 'Lojas e cardápios interativos', 'Aplicações com muitos estados', 'Interfaces que reaproveitam componentes'],
    notFor: ['Não é uma linguagem nova', 'Não inclui banco de dados', 'Uma página estática simples pode não precisar dele'],
    prerequisites: ['HTML', 'CSS', 'JavaScript'], related: ['javascript', 'typescript', 'vite', 'next'],
    searchTerms: 'interface componente estado app moderno painel sistema reutilizar frontend',
    example: example('Componente de contador', 'React / JSX', `import { useState } from 'react';
function Contador() {
  const [total, setTotal] = useState(0);
  return (
    <section className="contador">
      <p>Total: {total}</p>
      <button onClick={() => setTotal(total + 1)}>Adicionar</button>
    </section>
  );
}`, `<section class="react-demo"><span>Componente React</span><p>Total: <strong id="reactTotal">0</strong></p><button id="reactAdd">Adicionar</button></section>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#ecfeff;font-family:Arial}.react-demo{padding:26px 35px;border:1px solid #a5f3fc;border-radius:20px;background:#fff;text-align:center}.react-demo span{color:#0891b2;font-weight:800}.react-demo p{font-size:28px}.react-demo button{padding:11px 16px;border:0;border-radius:10px;background:#06b6d4;color:#083344;font-weight:900;cursor:pointer}`, `let total=0;document.querySelector('#reactAdd').addEventListener('click',()=>{document.querySelector('#reactTotal').textContent=++total});`)
  },
  {
    id: 'vite', name: 'Vite', logo: 'V', category: 'Frontend', level: 'Intermediário', accent: '#a78bfa',
    summary: 'Cria e executa projetos modernos com servidor rápido, módulos e build para produção.',
    definition: 'Vite é uma ferramenta de desenvolvimento que prepara projetos JavaScript, TypeScript, React e outros para trabalhar localmente e gerar arquivos otimizados.',
    analogy: 'É a oficina já organizada: liga as ferramentas, entrega atualizações rápidas e empacota o produto para publicação.',
    useCases: ['Iniciar projetos React ou TypeScript', 'Executar servidor local', 'Importar módulos e arquivos', 'Gerar build otimizado'],
    notFor: ['Não cria a interface sozinho', 'Não substitui React ou JavaScript', 'Normalmente exige Node.js instalado'],
    prerequisites: ['JavaScript', 'npm básico'], related: ['react', 'typescript', 'vercel'],
    searchTerms: 'criar projeto build servidor local npm rápido frontend empacotar',
    example: example('Estrutura de projeto', 'Terminal', `npm create vite@latest meu-projeto
cd meu-projeto
npm install
npm run dev`, `<div class="terminal"><div><i></i><i></i><i></i><span>Terminal</span></div><pre>$ npm run dev\n\n  VITE ready in 184 ms\n\n  ➜ Local: http://localhost:5173/</pre></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#111827;font-family:Arial}.terminal{width:min(430px,90%);overflow:hidden;border:1px solid #374151;border-radius:17px;background:#07101e;color:#dbeafe;box-shadow:0 24px 60px #0008}.terminal>div{padding:12px;border-bottom:1px solid #263248}.terminal i{display:inline-block;width:9px;height:9px;margin-right:6px;border-radius:50%;background:#a78bfa}.terminal span{margin-left:10px;color:#94a3b8;font-size:12px}.terminal pre{padding:18px;line-height:1.7;color:#86efac}`)
  },
  {
    id: 'tailwind', name: 'Tailwind CSS', logo: 'TW', category: 'Frontend', level: 'Intermediário', accent: '#06b6d4',
    summary: 'Oferece classes prontas para montar estilos diretamente nos componentes com rapidez e consistência.',
    definition: 'Tailwind CSS é um framework de classes utilitárias. Em vez de inventar nomes de classes para cada elemento, você combina pequenas regras prontas.',
    analogy: 'É uma caixa com peças de acabamento padronizadas: espaçamento, cor, tamanho e alinhamento já vêm em medidas consistentes.',
    useCases: ['Criar interfaces rapidamente', 'Manter escala de cores e espaçamentos', 'Trabalhar bem com componentes React', 'Construir design responsivo'],
    notFor: ['Ainda exige conhecimento de CSS', 'HTML pode ficar carregado de classes', 'Não define sozinho um bom design'],
    prerequisites: ['HTML', 'CSS'], related: ['css', 'react', 'vite'],
    searchTerms: 'css rápido classe design sistema responsivo interface estilo',
    example: example('Card com classes utilitárias', 'HTML + Tailwind', `<article class="rounded-2xl bg-white p-6 shadow-xl">
  <span class="text-sm font-bold text-cyan-600">Novo</span>
  <h2 class="mt-3 text-2xl font-black">Projeto moderno</h2>
  <p class="mt-2 text-slate-500">Interface feita combinando utilitários.</p>
</article>`, `<article class="tw-card"><span>Novo</span><h2>Projeto moderno</h2><p>Interface feita combinando utilitários.</p></article>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#ecfeff;font-family:Arial}.tw-card{max-width:320px;padding:24px;border-radius:20px;background:#fff;box-shadow:0 20px 50px #0891b233}.tw-card span{color:#0891b2;font-size:13px;font-weight:800}.tw-card h2{margin:12px 0 8px;font-size:26px}.tw-card p{margin:0;color:#64748b}`)
  },
  {
    id: 'node', name: 'Node.js', logo: 'NODE', category: 'Backend e dados', level: 'Intermediário', accent: '#65a30d',
    summary: 'Executa JavaScript fora do navegador para criar servidores, APIs, automações e ferramentas.',
    definition: 'Node.js é um ambiente de execução que leva JavaScript para o servidor e para o terminal.',
    analogy: 'É levar o cérebro JavaScript para a parte escondida do restaurante, onde pedidos são processados e informações são buscadas.',
    useCases: ['Criar APIs e servidores', 'Processar arquivos e tarefas', 'Executar ferramentas como Vite', 'Criar automações e integrações'],
    notFor: ['Não é um framework de interface', 'Precisa de cuidados de segurança', 'Não é banco de dados'],
    prerequisites: ['JavaScript'], related: ['api-rest', 'postgresql', 'playwright'],
    searchTerms: 'servidor backend javascript api automação terminal dados',
    example: example('Servidor mínimo', 'Node.js', `import http from 'node:http';
const servidor = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ mensagem: 'API funcionando!' }));
});
servidor.listen(3000);`, `<div class="api-result"><span>GET /api/status</span><pre>{\n  "mensagem": "API funcionando!"\n}</pre><small>200 OK</small></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#f7fee7;font-family:Arial}.api-result{width:330px;padding:22px;border:1px solid #bef264;border-radius:18px;background:#fff}.api-result span{color:#4d7c0f;font-weight:900}.api-result pre{margin:15px 0;padding:15px;border-radius:12px;background:#1f2937;color:#bef264;line-height:1.6}.api-result small{color:#16a34a;font-weight:800}`)
  },
  {
    id: 'api-rest', name: 'API REST', logo: 'API', category: 'Backend e dados', level: 'Intermediário', accent: '#f59e0b',
    summary: 'Define uma forma comum para sistemas trocarem dados por endereços e métodos HTTP.',
    definition: 'Uma API REST expõe recursos por URLs e usa métodos como GET, POST, PATCH e DELETE para consultar ou modificar dados.',
    analogy: 'É o garçom entre o cliente e a cozinha: recebe um pedido claro, leva para quem processa e devolve uma resposta.',
    useCases: ['Buscar produtos e pedidos', 'Criar cadastros', 'Conectar frontend e backend', 'Integrar serviços diferentes'],
    notFor: ['Não é o banco de dados', 'Precisa de autenticação e validação', 'Não deve expor dados privados sem regras'],
    prerequisites: ['HTTP básico', 'JavaScript ou outra linguagem'], related: ['node', 'supabase', 'postgresql'],
    searchTerms: 'conectar sistemas dados requisição get post backend frontend integração',
    example: example('Buscando produtos', 'JavaScript', `const resposta = await fetch('/api/produtos');
if (!resposta.ok) throw new Error('Falha ao buscar produtos');
const produtos = await resposta.json();
console.log(produtos);`, `<section class="products"><span>Resposta da API</span><div><strong>Açaí 500 ml</strong><small>R$ 18,00</small></div><div><strong>Milk-shake</strong><small>R$ 15,00</small></div></section>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#fffbeb;font-family:Arial}.products{width:310px;padding:22px;border-radius:18px;background:#fff;box-shadow:0 18px 45px #f59e0b22}.products>span{color:#b45309;font-size:12px;font-weight:900}.products div{margin-top:12px;padding:13px;border:1px solid #fde68a;border-radius:12px}.products strong,.products small{display:block}.products small{margin-top:4px;color:#64748b}`)
  },
  {
    id: 'postgresql', name: 'PostgreSQL', logo: 'SQL', category: 'Backend e dados', level: 'Intermediário', accent: '#60a5fa',
    summary: 'Armazena dados relacionais com consultas poderosas, integridade e transações.',
    definition: 'PostgreSQL é um banco de dados relacional. As informações ficam em tabelas conectadas por chaves e regras.',
    analogy: 'É um arquivo organizado com fichários relacionados. O cadastro do cliente se conecta aos pedidos sem repetir tudo em cada folha.',
    useCases: ['Clientes, pedidos e pagamentos', 'Relatórios e filtros complexos', 'Regras de integridade', 'Transações financeiras e operacionais'],
    notFor: ['Não cria a tela do sistema', 'Exige modelagem e segurança', 'Consultas mal planejadas podem ficar lentas'],
    prerequisites: ['Noção de dados e tabelas'], related: ['supabase', 'api-rest', 'node'],
    searchTerms: 'banco dados sql tabela cliente pedido relatório salvar consultar',
    example: example('Consultando pedidos', 'SQL', `SELECT cliente, total, status
FROM pedidos
WHERE status = 'pendente'
ORDER BY criado_em DESC;`, `<div class="sql-table"><span>Resultado da consulta</span><table><tr><th>Cliente</th><th>Total</th><th>Status</th></tr><tr><td>Ana</td><td>R$ 42,00</td><td><b>Pendente</b></td></tr><tr><td>João</td><td>R$ 26,00</td><td><b>Pendente</b></td></tr></table></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#eff6ff;font-family:Arial}.sql-table{width:min(430px,90%);padding:20px;border-radius:18px;background:#fff;box-shadow:0 18px 45px #2563eb22}.sql-table>span{color:#2563eb;font-size:12px;font-weight:900}table{width:100%;margin-top:13px;border-collapse:collapse}th,td{padding:11px;text-align:left;border-bottom:1px solid #e2e8f0;font-size:13px}th{color:#64748b}b{color:#d97706}`)
  },
  {
    id: 'supabase', name: 'Supabase', logo: 'S', category: 'Backend e dados', level: 'Intermediário', accent: '#34d399',
    summary: 'Reúne PostgreSQL, autenticação, arquivos, APIs e tempo real em uma plataforma de backend.',
    definition: 'Supabase é uma plataforma de backend baseada em PostgreSQL que oferece serviços prontos para aplicações web e mobile.',
    analogy: 'É um prédio já equipado: banco, portaria, arquivo e sistema de comunicação. Você ainda define as regras de cada sala.',
    useCases: ['Banco PostgreSQL gerenciado', 'Login e controle de acesso', 'Upload de imagens e documentos', 'Atualizações em tempo real'],
    notFor: ['Não elimina a modelagem do banco', 'RLS mal configurada pode expor dados', 'A interface continua sendo construída separadamente'],
    prerequisites: ['Banco de dados básico', 'JavaScript'], related: ['postgresql', 'api-rest', 'react'],
    searchTerms: 'backend pronto banco login autenticação storage realtime rls dados',
    example: example('Buscando pedidos no Supabase', 'JavaScript', `const { data, error } = await supabase
  .from('pedidos')
  .select('id, cliente, total, status')
  .eq('status', 'pendente');
if (error) throw error;`, `<div class="supa"><span>Tempo real conectado</span><h2>2 pedidos pendentes</h2><div><i></i> Pedido #104 — R$ 42,00</div><div><i></i> Pedido #105 — R$ 26,00</div></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#ecfdf5;font-family:Arial}.supa{width:330px;padding:23px;border:1px solid #a7f3d0;border-radius:19px;background:#fff}.supa>span{color:#059669;font-size:12px;font-weight:900}.supa h2{margin:12px 0 16px}.supa div{margin-top:9px;padding:12px;border-radius:11px;background:#f0fdf4;color:#475569;font-size:13px}.supa i{display:inline-block;width:8px;height:8px;margin-right:7px;border-radius:50%;background:#10b981}`)
  },
  {
    id: 'git-github', name: 'Git e GitHub', logo: 'GIT', category: 'Ferramentas', level: 'Básico', accent: '#fb7185',
    summary: 'Guarda o histórico do código, permite criar branches, revisar mudanças e colaborar.',
    definition: 'Git é o sistema de versionamento. GitHub hospeda repositórios e adiciona colaboração, revisão, issues e automações.',
    analogy: 'É uma máquina do tempo com cópias organizadas. Você registra etapas, testa em uma linha separada e volta quando necessário.',
    useCases: ['Salvar versões do projeto', 'Criar branches seguras', 'Revisar alterações em Pull Requests', 'Publicar código e colaborar'],
    notFor: ['Não substitui backup de dados de produção', 'Commit não corrige código ruim', 'Segredos nunca devem ser enviados ao repositório'],
    prerequisites: ['Noção básica de arquivos'], related: ['vercel', 'vite', 'playwright'],
    searchTerms: 'versionar código salvar histórico branch commit pull request repositório',
    example: example('Fluxo seguro de mudança', 'Terminal', `git switch -c feat/nova-tela
git add .
git commit -m "feat: cria nova tela"
git push -u origin feat/nova-tela`, `<div class="git-flow"><span>main</span><i>→</i><span>feat/nova-tela</span><i>→</i><strong>Pull Request ✓</strong><p>Alteração revisada antes de entrar na versão principal.</p></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#fff1f2;font-family:Arial}.git-flow{max-width:430px;padding:25px;border-radius:20px;background:#fff;box-shadow:0 18px 45px #fb718522;text-align:center}.git-flow span,.git-flow strong{display:inline-block;padding:9px 11px;border-radius:10px;background:#ffe4e6;color:#be123c;font-size:12px}.git-flow i{margin:0 7px;color:#94a3b8}.git-flow strong{background:#dcfce7;color:#15803d}.git-flow p{margin:17px 0 0;color:#64748b;font-size:13px}`)
  },
  {
    id: 'vercel', name: 'Vercel', logo: '▲', category: 'Ferramentas', level: 'Básico', accent: '#e2e8f0',
    summary: 'Publica aplicações na internet e cria previews automáticos para branches e Pull Requests.',
    definition: 'Vercel é uma plataforma de deploy focada em aplicações web. Ela conecta ao Git, executa o build e distribui o resultado globalmente.',
    analogy: 'É a transportadora e a vitrine: pega o projeto aprovado, prepara o pacote e o coloca disponível para o mundo.',
    useCases: ['Publicar sites e aplicações', 'Criar preview de cada Pull Request', 'Configurar domínio e HTTPS', 'Automatizar novos deploys'],
    notFor: ['Não substitui o banco de dados', 'Build quebrado não será publicado', 'Variáveis secretas precisam ser configuradas'],
    prerequisites: ['GitHub', 'Projeto web'], related: ['git-github', 'vite', 'next'],
    searchTerms: 'publicar site deploy domínio internet preview hospedagem produção',
    example: example('Pipeline de publicação', 'Fluxo', `1. Enviar código ao GitHub
2. Vercel executa o build
3. Preview é criado para revisão
4. Merge na main
5. Produção atualizada automaticamente`, `<div class="deploy"><div><span>1</span><b>GitHub</b><small>Código enviado</small></div><i>→</i><div><span>2</span><b>Build</b><small>Testado e otimizado</small></div><i>→</i><div class="ready"><span>3</span><b>Produção</b><small>READY ✓</small></div></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#f8fafc;font-family:Arial}.deploy{display:flex;align-items:center;gap:10px}.deploy>div{width:110px;padding:16px 10px;border:1px solid #e2e8f0;border-radius:15px;background:#fff;text-align:center}.deploy span{width:25px;height:25px;margin:0 auto 8px;display:grid;place-items:center;border-radius:50%;background:#111827;color:#fff;font-size:11px}.deploy b,.deploy small{display:block}.deploy small{margin-top:5px;color:#64748b;font-size:9px}.deploy i{color:#94a3b8}.deploy .ready{border-color:#86efac}.deploy .ready small{color:#16a34a;font-weight:800}@media(max-width:420px){.deploy{flex-direction:column}.deploy i{transform:rotate(90deg)}}`)
  },
  {
    id: 'playwright', name: 'Playwright', logo: 'PW', category: 'Ferramentas', level: 'Avançado', accent: '#84cc16',
    summary: 'Controla navegadores para testes automáticos, robôs e validação de fluxos reais.',
    definition: 'Playwright é uma ferramenta que abre navegadores por código, clica, preenche campos, verifica telas e captura evidências.',
    analogy: 'É um usuário robô extremamente disciplinado que repete o mesmo roteiro em vários navegadores e avisa quando algo muda.',
    useCases: ['Testar login e checkout', 'Validar responsividade', 'Criar automações autorizadas', 'Capturar screenshots e relatórios'],
    notFor: ['Não deve burlar proteções ou termos de serviço', 'Testes frágeis precisam de manutenção', 'Não substitui testes de unidade'],
    prerequisites: ['JavaScript ou TypeScript', 'HTML básico'], related: ['javascript', 'node', 'git-github'],
    searchTerms: 'teste navegador automação clicar formulário screenshot qa robô',
    example: example('Teste de login', 'TypeScript', `test('usuário entra no painel', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('E-mail').fill('teste@email.com');
  await page.getByLabel('Senha').fill('senha-segura');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL('/painel');
});`, `<div class="test-report"><span>Teste automatizado</span><h2>Login do usuário</h2><div><b>✓</b> Página aberta</div><div><b>✓</b> Formulário preenchido</div><div><b>✓</b> Redirecionou para /painel</div><strong>PASSOU — 1,4 s</strong></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#f7fee7;font-family:Arial}.test-report{width:340px;padding:22px;border-radius:18px;background:#18230b;color:#ecfccb}.test-report>span{color:#a3e635;font-size:11px;font-weight:900;text-transform:uppercase}.test-report h2{margin:9px 0 15px}.test-report div{margin-top:8px;color:#d9f99d;font-size:13px}.test-report b{color:#84cc16}.test-report strong{display:block;margin-top:17px;padding-top:12px;border-top:1px solid #3f6212;color:#bef264;font-size:12px}`)
  },
  {
    id: 'next', name: 'Next.js', logo: 'N', category: 'Avançado', level: 'Avançado', accent: '#cbd5e1',
    summary: 'Organiza aplicações React completas com rotas, servidor, renderização e recursos de produção.',
    definition: 'Next.js é um framework construído sobre React. Ele adiciona convenções para páginas, servidor, APIs, otimização e diferentes formas de renderizar conteúdo.',
    analogy: 'React entrega as peças; Next.js entrega também a planta, os corredores, a portaria e regras para montar o edifício completo.',
    useCases: ['Aplicações React completas', 'Sites com SEO e conteúdo dinâmico', 'Rotas e lógica no servidor', 'Projetos com frontend e backend integrados'],
    notFor: ['Exige compreender React primeiro', 'Pode ser excessivo para página simples', 'Ainda precisa de banco e regras bem projetadas'],
    prerequisites: ['React', 'JavaScript ou TypeScript'], related: ['react', 'typescript', 'vercel'],
    searchTerms: 'framework react fullstack rota servidor seo página app completo',
    example: example('Página de produto', 'Next.js / TSX', `export default async function ProdutoPage({ params }) {
  const produto = await buscarProduto(params.id);
  return <main><h1>{produto.nome}</h1><p>R$ {produto.preco}</p></main>;
}`, `<main class="next-page"><span>Rota: /produtos/42</span><div><small>Produto carregado no servidor</small><h1>Açaí 500 ml</h1><strong>R$ 18,00</strong><button>Adicionar ao pedido</button></div></main>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#f8fafc;font-family:Arial}.next-page{width:340px}.next-page>span{display:block;margin-bottom:9px;color:#64748b;font-size:11px}.next-page>div{padding:25px;border:1px solid #e2e8f0;border-radius:19px;background:#fff;box-shadow:0 18px 45px #0f172a15}.next-page small{color:#64748b}.next-page h1{margin:12px 0 7px}.next-page strong{font-size:24px}.next-page button{width:100%;margin-top:18px;padding:12px;border:0;border-radius:11px;background:#0f172a;color:#fff;font-weight:800}`)
  },
  {
    id: 'ai-api', name: 'IA via API', logo: 'IA', category: 'Avançado', level: 'Avançado', accent: '#f472b6',
    summary: 'Integra modelos de inteligência artificial para texto, imagem, áudio, classificação e automação.',
    definition: 'Uma API de IA permite que seu sistema envie uma entrada a um modelo hospedado e receba uma resposta estruturada ou gerada.',
    analogy: 'É contratar um especialista sob demanda. Seu sistema envia contexto e tarefa; o especialista responde, mas você continua responsável por validar o resultado.',
    useCases: ['Assistentes e chatbots', 'Resumo e classificação de documentos', 'Extração de informações', 'Geração e revisão de conteúdo'],
    notFor: ['Chaves secretas não ficam no frontend', 'Respostas podem conter erros', 'Dados sensíveis exigem política e proteção', 'Custo e limites precisam ser monitorados'],
    prerequisites: ['API REST', 'Backend', 'Validação de dados'], related: ['api-rest', 'node', 'next'],
    searchTerms: 'inteligência artificial chat bot resumo gerar texto modelo api automação',
    example: example('Solicitação segura no backend', 'JavaScript', `const resposta = await clienteIA.respostas.criar({
  modelo: 'modelo-escolhido',
  entrada: 'Resuma este relatório em 3 pontos.'
});
const resumo = validarResposta(resposta);
return resumo;`, `<div class="ai-result"><span>Assistente de relatório</span><h2>Resumo em 3 pontos</h2><ol><li>O estoque caiu 8% na semana.</li><li>Dois produtos concentram a maior saída.</li><li>A reposição é recomendada até sexta-feira.</li></ol><small>Resultado revisado antes de ser utilizado.</small></div>`, `body{min-height:100vh;margin:0;display:grid;place-items:center;background:#fdf2f8;font-family:Arial}.ai-result{width:min(420px,90%);padding:23px;border:1px solid #fbcfe8;border-radius:19px;background:#fff}.ai-result>span{color:#db2777;font-size:12px;font-weight:900}.ai-result h2{margin:10px 0}.ai-result ol{padding-left:20px;color:#475569;line-height:1.65;font-size:13px}.ai-result small{color:#9f1239;font-weight:700}`)
  }
];

export const learningPaths = [
  { id: 'primeiro-site', number: '01', title: 'Criar meu primeiro site', description: 'Aprenda a base, publique uma página e entenda cada parte sem pular etapas.', accent: '#8b5cf6', steps: ['html', 'css', 'javascript', 'git-github', 'vercel'] },
  { id: 'sistema-moderno', number: '02', title: 'Criar um sistema moderno', description: 'Evolua da base para componentes, tipos, dados e uma aplicação completa.', accent: '#06b6d4', steps: ['javascript', 'typescript', 'react', 'vite', 'supabase'] },
  { id: 'automacao-ia', number: '03', title: 'Automação e inteligência artificial', description: 'Conecte serviços, automatize o navegador e use IA com responsabilidade.', accent: '#f472b6', steps: ['javascript', 'node', 'api-rest', 'playwright', 'ai-api'] }
];

export const labExamples = {
  card: {
    name: 'Card de apresentação',
    html: `<article class="card">
  <span class="tag">Novo projeto</span>
  <h1>Guia Web Definitivo</h1>
  <p>Aprenda vendo o código funcionar.</p>
  <button id="action">Explorar agora</button>
  <small id="message"></small>
</article>`,
    css: `body{min-height:100vh;margin:0;display:grid;place-items:center;font-family:Arial;background:linear-gradient(135deg,#eef2ff,#ecfeff)}.card{width:min(340px,calc(100% - 48px));padding:28px;border-radius:22px;background:#fff;box-shadow:0 24px 60px rgba(76,29,149,.18)}.tag{color:#7c3aed;font-weight:800}h1{margin:13px 0 8px;color:#172033}p{color:#64748b;line-height:1.55}button{margin-top:12px;padding:12px 17px;border:0;border-radius:11px;color:#fff;background:#7c3aed;font-weight:800;cursor:pointer}small{display:block;margin-top:12px;color:#059669}`,
    js: `const botao=document.querySelector('#action');const mensagem=document.querySelector('#message');botao.addEventListener('click',()=>{mensagem.textContent='Funcionou! O JavaScript respondeu ao clique.'});`
  },
  counter: {
    name: 'Contador',
    html: `<main class="counter"><span>Total de cliques</span><strong id="value">0</strong><div><button id="remove">−</button><button id="add">+</button></div></main>`,
    css: `body{min-height:100vh;margin:0;display:grid;place-items:center;font-family:Arial;background:#fefce8}.counter{padding:30px 42px;border:1px solid #fde68a;border-radius:24px;background:#fff;text-align:center}.counter span{color:#a16207;font-weight:800}.counter strong{display:block;margin:12px 0;font-size:64px}.counter div{display:flex;justify-content:center;gap:10px}button{width:48px;height:43px;border:0;border-radius:12px;background:#eab308;color:#422006;font-size:22px;font-weight:900;cursor:pointer}`,
    js: `let total=0;const valor=document.querySelector('#value');document.querySelector('#add').addEventListener('click',()=>{valor.textContent=++total});document.querySelector('#remove').addEventListener('click',()=>{valor.textContent=--total});`
  },
  form: {
    name: 'Formulário validado',
    html: `<form id="contactForm"><h1>Entre em contato</h1><label>Nome<input id="name" placeholder="Seu nome"></label><label>E-mail<input id="email" type="email" placeholder="voce@email.com"></label><button>Enviar</button><p id="feedback"></p></form>`,
    css: `body{min-height:100vh;margin:0;display:grid;place-items:center;font-family:Arial;background:#eff6ff}form{width:min(350px,calc(100% - 48px));padding:26px;border-radius:20px;background:#fff;box-shadow:0 20px 50px #2563eb22}h1{margin-top:0}label{display:grid;gap:6px;margin-top:14px;color:#475569;font-size:13px;font-weight:700}input{padding:12px;border:1px solid #cbd5e1;border-radius:10px;outline:none}input:focus{border-color:#2563eb;box-shadow:0 0 0 3px #2563eb18}button{width:100%;margin-top:18px;padding:12px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-weight:800;cursor:pointer}#feedback{min-height:20px;color:#059669;font-size:13px}`,
    js: `const form=document.querySelector('#contactForm');const feedback=document.querySelector('#feedback');form.addEventListener('submit',e=>{e.preventDefault();const ok=document.querySelector('#name').value.trim()&&document.querySelector('#email').value.trim();feedback.style.color=ok?'#059669':'#dc2626';feedback.textContent=ok?'Dados validados com sucesso!':'Preencha nome e e-mail.'});`
  }
};
