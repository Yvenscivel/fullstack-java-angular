package com.projetin.projetospringangular.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
@Table(name = "produtos")
public class Produto  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    private String descricao;
    private BigDecimal preco;
    private Integer quantidadeEstoque;
    private String codigoBarras;
    private Boolean ativo = true;

}
