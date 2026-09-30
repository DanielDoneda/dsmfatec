package br.com.fatec.loja.produto;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProdutoIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProdutoRepository repository;

    @BeforeEach
    void limparBanco() {
        repository.deleteAll();
    }

    @Test
    void deveCadastrarProdutoEGravarNoBanco() throws Exception {
        mockMvc.perform(post("/produtos")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "nome": "Teclado mecanico",
                      "preco": 199.90,
                      "estoque": 15
                    }
                    """))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.nome").value("Teclado mecanico"))
            .andExpect(jsonPath("$.preco").value(199.90))
            .andExpect(jsonPath("$.estoque").value(15));
    }

    @Test
    void deveListarProdutosPersistidos() throws Exception {
        repository.save(new Produto("Mouse sem fio", java.math.BigDecimal.valueOf(89.90), 20));
        repository.save(new Produto("Monitor 24", java.math.BigDecimal.valueOf(799.90), 8));

        mockMvc.perform(get("/produtos"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].nome").value("Mouse sem fio"))
            .andExpect(jsonPath("$[1].nome").value("Monitor 24"));
    }

    @Test
    void deveBuscarProdutoPorId() throws Exception {
        Produto produto = repository.save(new Produto("Notebook", java.math.BigDecimal.valueOf(3500), 4));

        mockMvc.perform(get("/produtos/{id}", produto.getId()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nome").value("Notebook"))
            .andExpect(jsonPath("$.estoque").value(4));
    }

    @Test
    void deveRetornarErroQuandoProdutoForInvalido() throws Exception {
        mockMvc.perform(post("/produtos")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "nome": "",
                      "preco": 0,
                      "estoque": -1
                    }
                    """))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.erro").value("Nome do produto e obrigatorio"));
    }
}
