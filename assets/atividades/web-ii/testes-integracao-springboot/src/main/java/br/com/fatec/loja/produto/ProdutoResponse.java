package br.com.fatec.loja.produto;

import java.math.BigDecimal;

public record ProdutoResponse(Long id, String nome, BigDecimal preco, Integer estoque) {
    public static ProdutoResponse from(Produto produto) {
        return new ProdutoResponse(
            produto.getId(),
            produto.getNome(),
            produto.getPreco(),
            produto.getEstoque()
        );
    }
}
