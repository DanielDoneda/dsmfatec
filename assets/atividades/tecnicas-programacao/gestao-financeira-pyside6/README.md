# Sistema de Gestao Financeira - PySide6

Projeto pratico de TPII para demonstrar uma interface grafica desktop em Python. O sistema cadastra receitas e despesas, calcula o resumo financeiro, permite filtros e mantem os dados em SQLite.

## Funcionalidades

- Cadastro, edicao e exclusao de receitas e despesas.
- Resumo de receitas, despesas e saldo conforme os filtros ativos.
- Busca por texto e filtros por tipo, categoria e periodo.
- Persistencia local em `data/financas.db`, criada automaticamente.
- Exportacao dos registros filtrados para CSV.
- Dados de demonstracao pelo menu **Arquivo > Inserir dados de demonstracao**.
- Validacao dos campos e confirmacao antes da exclusao.

## Arquitetura

```text
main.py                       ponto de entrada
app/application.py            inicializacao e injecao de dependencias
app/models.py                 entidades e filtros
app/database.py               conexao e esquema SQLite
app/repository.py             operacoes CRUD e consultas SQL
app/services.py               validacoes, calculos e exportacao
app/ui/main_window.py         dashboard, filtros e tabela
app/ui/transaction_dialog.py  formulario de cadastro e edicao
tests/test_services.py        testes das regras e persistencia
```

A interface nao executa SQL diretamente. A janela chama o servico, o servico valida os dados e o repositorio conversa com o banco. Essa separacao facilita testes e manutencao.

## Passo a passo no PyCharm

1. Extraia a pasta do projeto.
2. Abra o PyCharm e escolha **Open**.
3. Selecione a pasta `GestaoFinanceira-PySide6`.
4. Acesse **File > Settings > Project > Python Interpreter**.
5. Crie um ambiente virtual com Python 3.10 ou superior.
6. Abra o terminal do PyCharm e execute:

```bash
python -m pip install -r requirements.txt
```

7. Abra `main.py` e clique em **Run**, ou execute:

```bash
python main.py
```

O banco aparece em `data/financas.db` no primeiro uso. Para uma demonstracao rapida, use **Arquivo > Inserir dados de demonstracao**.

## Como testar

Os testes nao abrem a interface e usam um banco temporario:

```bash
python -m unittest discover -s tests -v
```

## Codigo comentado: fluxo de um cadastro

1. O botao **Novo lancamento** abre `TransactionDialog`.
2. O formulario envia os campos para `FinanceService.save()`.
3. O servico remove espacos, valida descricao e categoria e converte o valor para centavos.
4. `TransactionRepository.add()` usa parametros `?` no SQL para salvar com seguranca.
5. A janela executa `refresh()` e atualiza tabela e totais.

Valores monetarios sao armazenados em centavos inteiros. Assim, o sistema evita imprecisoes comuns de numeros de ponto flutuante.

## Sobre o PySide6

PySide6 e o conjunto oficial de bindings Python para o framework Qt 6. Ele permite criar aplicativos desktop multiplataforma com componentes nativos, sinais e slots, layouts, tabelas, formularios e temas. A licenca LGPL facilita seu uso em projetos educacionais e comerciais, desde que suas condicoes sejam respeitadas.

### Vantagens

- Interface profissional e muitos componentes prontos.
- Execucao em Windows, Linux e macOS.
- Boa separacao entre componentes, eventos e regras de negocio.
- Ecossistema Qt maduro e documentado.

### Desvantagens

- Instalacao maior que a do Tkinter.
- Curva de aprendizado para sinais, slots e layouts.
- Empacotamento do executavel exige uma ferramenta adicional, como PyInstaller.

### Casos de uso

Sistemas internos, cadastros, dashboards, ferramentas tecnicas, editores e aplicativos desktop que precisam de uma interface mais completa.

## Decisoes do projeto

- `sqlite3` foi escolhido por fazer parte do Python e nao exigir servidor.
- A camada de servico centraliza validacoes e calculos.
- O tipo da movimentacao usa `Enum`, reduzindo valores inconsistentes.
- O CSV usa UTF-8 com BOM e `;`, facilitando a abertura no Excel em portugues.

## Identificacao para preencher antes da entrega

- Integrantes: ______________________________________________
- Curso/turma: DSM - 3o semestre
- Instituicao: Fatec Indaiatuba
- Disciplina: Tecnicas de Programacao II (TPII)
- Professora: Waldinelly Costa

## Consideracoes finais

Os testes mostraram que PySide6 atende bem a um sistema desktop com formulario, tabela, filtros e eventos. A combinacao com SQLite cria uma aplicacao funcional sem depender de um servidor. A arquitetura em camadas tornou possivel testar o cadastro, a alteracao, a exclusao, os filtros e os totais sem abrir a interface.

