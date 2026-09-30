package br.com.fatec.loja.produto;

import java.math.BigDecimal;

public record ProdutoRequest(String nome, BigDecimal preco, Integer estoque) {
}
