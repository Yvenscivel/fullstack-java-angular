package com.projetin.projetospringangular.repository;

import com.projetin.projetospringangular.model.Categoria;
import com.projetin.projetospringangular.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByCategoria(Categoria categoria);
    List<Produto> findAllByQuantidadeEstoqueIsLessThanAndAtivo(Integer quantidadeEstoqueIsLessThan, Boolean ativo);
}
