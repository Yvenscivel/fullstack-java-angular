package com.projetin.projetospringangular.exception;

public class ProdutoNotFoundException extends RuntimeException{
    public ProdutoNotFoundException (String mensagemDeErro){
        super(mensagemDeErro);
    }
}
