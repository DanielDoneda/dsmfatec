# Banco de Dados Nao Relacional com MongoDB

Atividade academica com criacao do banco `loja_virtual`.

## Objetivo

Representar uma loja virtual usando documentos MongoDB. O modelo prioriza flexibilidade, documentos JSON e consultas diretas sobre clientes, produtos e pedidos.

## Banco

```javascript
use loja_virtual
```

## Colecao clientes

```javascript
db.clientes.insertMany([
  {
    nome: "Ana Souza",
    email: "ana.souza@email.com",
    telefone: "19999990001",
    endereco: {
      cidade: "Indaiatuba",
      estado: "SP"
    }
  },
  {
    nome: "Carlos Lima",
    email: "carlos.lima@email.com",
    telefone: "19999990002",
    endereco: {
      cidade: "Campinas",
      estado: "SP"
    }
  }
])
```

## Colecao produtos

```javascript
db.produtos.insertMany([
  {
    nome: "Teclado mecanico",
    categoria: "Perifericos",
    preco: 199.90,
    estoque: 15
  },
  {
    nome: "Mouse sem fio",
    categoria: "Perifericos",
    preco: 89.90,
    estoque: 20
  },
  {
    nome: "Monitor 24 polegadas",
    categoria: "Monitores",
    preco: 799.90,
    estoque: 8
  }
])
```

## Colecao pedidos

```javascript
db.pedidos.insertOne({
  cliente: {
    nome: "Ana Souza",
    email: "ana.souza@email.com"
  },
  itens: [
    {
      produto: "Teclado mecanico",
      quantidade: 1,
      precoUnitario: 199.90
    },
    {
      produto: "Mouse sem fio",
      quantidade: 2,
      precoUnitario: 89.90
    }
  ],
  total: 379.70,
  status: "confirmado",
  criadoEm: new Date()
})
```

## Consultas

```javascript
db.produtos.find({ categoria: "Perifericos" })
```

```javascript
db.produtos.find({ preco: { $lte: 200 } })
```

```javascript
db.pedidos.find({ "cliente.email": "ana.souza@email.com" })
```

```javascript
db.pedidos.aggregate([
  { $unwind: "$itens" },
  {
    $group: {
      _id: "$itens.produto",
      quantidadeVendida: { $sum: "$itens.quantidade" },
      valorVendido: { $sum: { $multiply: ["$itens.quantidade", "$itens.precoUnitario"] } }
    }
  }
])
```

## Aprendizado

O MongoDB permite guardar documentos com estruturas flexiveis. Em uma loja virtual, isso facilita representar pedidos com itens internos e dados resumidos do cliente no mesmo documento. A modelagem precisa considerar o padrao de consulta mais frequente para evitar repeticao excessiva ou documentos grandes demais.
