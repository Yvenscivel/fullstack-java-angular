package com.projetin.projetospringangular.service;

import com.projetin.projetospringangular.model.Categoria;
import com.projetin.projetospringangular.model.Produto;
import com.projetin.projetospringangular.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public Produto salvar(Produto produto) {
        if (produto.getPreco().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Preço inválido!");
        }
        produto.setAtivo(true);
        return repository.save(produto);
    }

    public List<Produto> salvarEmLote(List<Produto> produtos) {
    return repository.saveAll(produtos);
}


    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public List<Produto> listarProdutosBaixoEstoque(){
        return repository.findAllByQuantidadeEstoqueIsLessThanAndAtivo(5,true);
    }

    public List<Produto> buscarPorCategoria(Categoria categoria ){
        return repository.findByCategoria(categoria);
    }

    public Produto buscarPorId(Long id){
        Produto produto = repository.findById(id)
                .orElseThrow(()->new RuntimeException("Produto não encontrado"));
        return produto;
    }

    public Produto alterarProduto(Long id, Produto produtoComNovosDados){
        Produto produtoExistente = repository.findById(id)
                .orElseThrow(()->new RuntimeException("Produto não encontrado"));

        produtoExistente.setNome(produtoComNovosDados.getNome());
        produtoExistente.setPreco(produtoComNovosDados.getPreco());
        produtoExistente.setCategoria(produtoComNovosDados.getCategoria());
        produtoExistente.setDescricao(produtoComNovosDados.getDescricao());
        produtoExistente.setQuantidadeEstoque(produtoComNovosDados.getQuantidadeEstoque());

        return repository.save(produtoExistente);
    }


    public void deletarProduto(Long id){
        if (repository.existsById(id)){
            repository.deleteById(id);
        }else{
            throw new RuntimeException("Produto não encontrado");
        }
    }
}
