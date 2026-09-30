package br.com.fatec.loja.produto;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProdutoService {
    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public ProdutoResponse cadastrar(ProdutoRequest request) {
        validar(request);
        Produto produto = new Produto(request.nome(), request.preco(), request.estoque());
        return ProdutoResponse.from(repository.save(produto));
    }

    public List<ProdutoResponse> listar() {
        return repository.findAll().stream().map(ProdutoResponse::from).toList();
    }

    public ProdutoResponse buscarPorId(Long id) {
        Produto produto = repository.findById(id)
            .orElseThrow(() -> new ProdutoNaoEncontradoException("Produto nao encontrado"));
        return ProdutoResponse.from(produto);
    }

    private void validar(ProdutoRequest request) {
        if (request.nome() == null || request.nome().isBlank()) {
            throw new IllegalArgumentException("Nome do produto e obrigatorio");
        }

        if (request.preco() == null || request.preco().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Preco deve ser maior que zero");
        }

        if (request.estoque() == null || request.estoque() < 0) {
            throw new IllegalArgumentException("Estoque nao pode ser negativo");
        }
    }
}
