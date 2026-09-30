# Testes de Integracao com Spring Boot

Exemplo pratico para a disciplina Desenvolvimento Web II.

## Objetivo

Demonstrar um teste de integracao em uma API simples de produtos. O teste carrega o contexto do Spring Boot, executa chamadas HTTP com MockMvc, passa pelo controller, service e repository, e valida os dados gravados em um banco H2 em memoria.

## Tecnologias

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- H2 Database
- JUnit 5
- MockMvc

## Como executar

```bash
mvn test
```

## Cenario testado

1. O teste envia um POST para `/produtos`.
2. O controller recebe o JSON.
3. O service aplica a regra de negocio.
4. O repository grava no banco H2.
5. O teste verifica a resposta HTTP e confirma a persistencia.

## Avaliacao quantitativa usada na apresentacao

| Indicador | Resultado esperado |
| --- | ---: |
| Testes de integracao | 4 |
| Testes aprovados | 4 |
| Taxa de sucesso | 100% |
| Banco usado | H2 em memoria |
| Camadas integradas | Controller, Service, Repository e Banco |

## Diferenca para teste unitario

No teste unitario, uma classe costuma ser testada isoladamente, com dependencias simuladas. Neste exemplo, o foco e verificar se as camadas reais da aplicacao funcionam juntas.
