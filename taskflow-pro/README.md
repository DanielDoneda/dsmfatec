# TaskFlow Pro — demonstração comparativa SPA × MPA

Projeto acadêmico para Desenvolvimento Web III. A entrega contém duas aplicações visualmente equivalentes para demonstrar as diferenças de arquitetura e experiência.

## Execução

Abra `index.html` para escolher uma versão. Para uma demonstração mais fiel, execute um servidor local nesta pasta:

```powershell
npx serve .
```

Abra o endereço informado, escolha a SPA e depois abra a MPA em outra janela.

## Experimento principal

1. Abra as duas versões lado a lado.
2. Inicie o cronômetro nas duas.
3. Entre em Tarefas e digite `apresentação` na busca.
4. Sem apagar a busca, navegue até o Kanban.
5. Retorne para Tarefas.
6. Compare:
   - As duas versões exibem uma carga inicial de 1 segundo.
   - Na SPA, as próximas telas abrem sem repetir a carga; o cronômetro e a pesquisa continuam.
   - Na MPA, a carga de 1 segundo reaparece; o cronômetro reinicia e a pesquisa desaparece.
   - A SPA registra transições internas de 8 KB simulados.
   - A MPA registra cargas completas de 84 KB simulados.

## Funcionalidades

- Dashboard com métricas, gráfico e progresso de projetos.
- Tarefas com pesquisa, filtros, prioridade, prazo e projeto.
- Cadastro detalhado de tarefas.
- Kanban com avanço entre três estados.
- Tema claro e escuro.
- Cronômetro de foco.
- Telemetria didática de navegação.
- Dados persistidos em `localStorage` e compartilhados entre as duas versões.
- Layout responsivo.

## Observação técnica

Os números de transferência são simulações didáticas, indicadas como tal na interface. O objetivo é visualizar a diferença entre recarregar o documento completo e atualizar somente uma região da aplicação.
