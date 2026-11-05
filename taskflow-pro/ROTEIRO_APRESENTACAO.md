# Roteiro de apresentação — TaskFlow Pro

## 1. Introdução

“Desenvolvemos o mesmo sistema em duas arquiteturas. As funcionalidades e os dados são iguais; o que muda é a forma como o navegador troca as telas.”

## 2. SPA

- Mostrar que existe apenas um `index.html`.
- Destacar a carga inicial de 1 segundo, necessária para preparar interface, componentes e dados.
- Iniciar o cronômetro.
- Pesquisar uma tarefa.
- Navegar para Kanban e retornar.
- Destacar que o cronômetro e o filtro foram preservados.
- Mostrar que a telemetria contabilizou transições internas.

## 3. MPA

- Explicar que Dashboard, Tarefas, Kanban e Comparação são arquivos HTML diferentes.
- Destacar que a mesma carga de 1 segundo se repete a cada troca de página.
- Iniciar o cronômetro.
- Pesquisar a mesma tarefa.
- Navegar para Kanban e retornar.
- Mostrar a tela de carregamento, o cronômetro reiniciado e o campo vazio.
- Mostrar o crescimento do número de cargas completas.

## 4. Conclusão equilibrada

“A SPA oferece uma experiência melhor para sistemas altamente interativos porque preserva o estado e atualiza apenas o necessário. A MPA pode ser mais simples e adequada para sites com pouca interação, conteúdo independente e prioridade em simplicidade ou renderização tradicional.”

## 5. Pontos técnicos para perguntas

- Os dados persistentes ficam em `localStorage`, por isso sobrevivem nas duas arquiteturas.
- Busca, filtros, tema e cronômetro são estados temporários; eles evidenciam a diferença de ciclo de vida.
- Os valores em KB são simulações didáticas, não medições reais de rede.
- Uma aplicação real pode reduzir as desvantagens de qualquer arquitetura com cache, renderização no servidor e estratégias híbridas.
