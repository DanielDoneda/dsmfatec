# SEO Lab — cinco pilares na prática

Projeto acadêmico independente para a disciplina de Desenvolvimento Web III. O laboratório demonstra, com controles interativos, como cinco pilares de SEO influenciam a qualidade de uma página web.

## Como executar

### Opção mais simples

Abra o arquivo `index.html` com duplo clique. O projeto não usa bibliotecas externas e funciona offline.

### Opção recomendada para o Lighthouse

Abra um terminal nesta pasta e execute um servidor local:

```powershell
npx serve .
```

Abra o endereço exibido no terminal (normalmente `http://localhost:3000`). Se o `npx` não estiver disponível, use a extensão Live Server do VS Code.

## O que demonstrar

1. **Visibilidade:** altere título e descrição; compare a prévia otimizada e problemática.
2. **Desempenho:** desative a otimização e execute a simulação nas duas versões.
3. **Experiência do usuário:** tente localizar “Tarefas” com rótulos claros e depois vagos.
4. **Organização do conteúdo:** compare a árvore de títulos e o HTML semântico.
5. **Acessibilidade:** compare contraste, label e ordem de foco; use `Tab` para navegar.

O índice no topo é uma síntese didática do estado dos cinco experimentos. Ele não representa uma pontuação real do Google.

## Relação com o TaskFlow Pro

O projeto anterior, TaskFlow Pro, demonstra diferenças de navegação e estado entre SPA e MPA. O SEO Lab é uma entrega separada e usa o sistema apenas como contexto:

- Em uma SPA, páginas públicas precisam de URLs, metadados por rota e conteúdo indexável. SSR ou pré-renderização podem ser necessários.
- Em uma MPA, cada documento pode trazer metadados e conteúdo próprios, mas desempenho, estrutura e acessibilidade continuam dependendo da implementação.
- Nenhuma arquitetura garante SEO sozinha.

## Teste com Lighthouse

1. Execute o projeto em um servidor local.
2. Abra o DevTools do Chrome (`F12`).
3. Selecione **Lighthouse**.
4. Marque **Performance**, **Accessibility**, **Best Practices** e **SEO**.
5. Use o modo Mobile e clique em **Analyze page load**.

Registre o resultado obtido no computador da apresentação. A prévia de busca e as métricas de imagem do laboratório são simulações educativas; uma boa nota no Lighthouse não garante indexação nem posição no Google.

## Estrutura

```text
seo-lab/
├── index.html   # conteúdo e cinco experimentos
├── style.css    # identidade visual, responsividade e estados
├── script.js    # interações e simulações
└── README.md    # execução, apresentação e testes
```

## Tecnologias

HTML5 semântico, CSS responsivo e JavaScript puro. Não há dependências, build ou coleta de dados.
