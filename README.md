<div align="center">

# Guia Web Definitivo

### Aprenda tecnologia vendo o código funcionar

[![Acessar guia](https://img.shields.io/badge/Acessar-Guia_Web-7C3AED?style=for-the-badge)](https://paulo968.github.io/guia-web/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

## Sobre o projeto

O **Guia Web Definitivo** é uma biblioteca educacional interativa para quem está começando em desenvolvimento web. Cada tecnologia é apresentada em português simples, com definição, analogia, casos de uso, limitações, pré-requisitos, exemplo de código e resultado visual.

A proposta é reduzir a distância entre decorar uma definição e compreender qual papel aquela tecnologia desempenha em um projeto real.

## Da fundação ao site no ar

A página inicial apresenta um mapa visual que conecta as tecnologias em três partes:

1. **Fundação:** HTML, CSS e JavaScript;
2. **Aplicação:** React, Next.js, Node.js e Supabase;
3. **Produção:** Vite, Git/GitHub, Netlify e Vercel.

A explicação expansível usa a analogia de uma construção para mostrar como interface, backend, dados, versionamento, testes e deploy trabalham juntos.

## Navegação por telas

O guia funciona como uma aplicação com rotas baseadas no fragmento da URL. Cada endereço exibe apenas o conteúdo daquele assunto:

| Tela | Endereço |
|---|---|
| Início | `#/inicio` |
| Biblioteca | `#/biblioteca` |
| Trilhas | `#/trilhas` |
| Laboratório | `#/laboratorio` |
| Tecnologia | `#/tecnologia/html`, `#/tecnologia/react`, `#/tecnologia/netlify`, etc. |

No celular, a navegação fica em uma barra inferior. No computador, as mesmas opções aparecem no cabeçalho.

## Principais recursos

- biblioteca com pesquisa por nome, objetivo ou problema;
- filtros por categoria e nível;
- **17 tecnologias** explicadas individualmente;
- página e endereço compartilhável para cada tecnologia;
- mapa visual que conecta as principais camadas de uma aplicação web;
- exemplos de código acompanhados de uma prévia ilustrativa;
- laboratório editável de HTML, CSS e JavaScript;
- atualização automática do laboratório após uma breve pausa;
- trilhas para primeiro site, sistema moderno e automação com IA;
- progresso de estudo salvo no navegador;
- tema claro e escuro;
- layout responsivo para desktop, tablet e celular;
- cuidados contra rolagem horizontal e scroll fantasma;
- PWA com cache offline dos arquivos principais;
- navegação por teclado, regiões de status e outros cuidados de acessibilidade;
- validação automática de sintaxe, estrutura, catálogo, links internos, PWA e entrega HTTP.

## Tecnologias abordadas

| Categoria | Conteúdo |
|---|---|
| Fundamentos | HTML, CSS, JavaScript e TypeScript |
| Frontend | React, Vite e Tailwind CSS |
| Backend e dados | Node.js, API REST, PostgreSQL e Supabase |
| Ferramentas | Git/GitHub, Netlify, Vercel e Playwright |
| Avançado | Next.js e IA via API |

## Sobre os exemplos

As páginas das tecnologias mostram o código e uma prévia visual para facilitar o entendimento. Em tecnologias que não executam diretamente no navegador — como SQL, TypeScript, Next.js, Playwright e IA via API — a prévia é **ilustrativa**.

O laboratório é a área executável do guia. Ele roda HTML, CSS e JavaScript em um `iframe` isolado com `sandbox="allow-scripts"`.

## Laboratório

No laboratório, a pessoa pode:

- editar HTML, CSS e JavaScript separadamente;
- alternar entre exemplos prontos;
- visualizar a atualização automática;
- executar imediatamente com `Ctrl + Enter` ou `Cmd + Enter`;
- restaurar o exemplo selecionado;
- usar as setas do teclado para trocar as abas dos editores.

## Estrutura

```text
guia-web/
├── .github/
│   └── workflows/
│       └── validate.yml
├── assets/
│   └── favicon.svg
├── 404.html
├── app.js
├── bootstrap.js
├── data.js
├── data-patch.js
├── index.html
├── lab-live.js
├── manifest.webmanifest
├── service-worker.js
├── styles.css
├── styles-architecture.css
├── styles-lab.css
├── styles-pages.css
└── styles-responsive.css
```

### Responsabilidade dos arquivos principais

- `index.html`: estrutura das telas e da seção visual inicial;
- `data.js`: catálogo-base, trilhas e exemplos do laboratório;
- `data-patch.js`: revisões de conteúdo e tecnologia adicional carregadas antes da interface;
- `bootstrap.js`: valida preferências salvas e inicializa os módulos na ordem correta;
- `app.js`: rotas, filtros, progresso, tema, páginas de tecnologia e laboratório;
- `lab-live.js`: atualização automática e ajuda contextual do laboratório;
- `service-worker.js`: cache e funcionamento offline;
- `validate.yml`: verificações automáticas executadas pelo GitHub Actions.

## Executando localmente

Como o projeto usa módulos JavaScript, abra-o por um servidor HTTP local. Na pasta do projeto, execute:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

Abrir o `index.html` diretamente pelo explorador de arquivos pode impedir o carregamento correto dos módulos.

## Validação automática

A automação do GitHub verifica:

- sintaxe dos arquivos JavaScript;
- presença dos arquivos obrigatórios;
- IDs duplicados e recursos locais ausentes no HTML;
- integridade das 17 tecnologias, relações e trilhas;
- exemplos corrigidos de Next.js e Playwright;
- identificação explícita do exemplo de IA como pseudocódigo;
- lista de arquivos do cache offline;
- disponibilidade dos arquivos por um servidor HTTP local;
- ausência de dependências visuais externas não fixadas.

## Autor

Criado por [Paulo Zaqueu](https://github.com/Paulo968) como material aberto de estudo e apoio para pessoas que desejam compreender desenvolvimento web de forma visual e prática.

[Portfólio](https://portfolio-paulo-ashy.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/paulo-zaqueu-762459187) · [E-mail](mailto:paulozaqueu3@gmail.com)
