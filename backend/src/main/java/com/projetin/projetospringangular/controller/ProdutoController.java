package com.projetin.projetospringangular.controller;


import com.projetin.projetospringangular.model.Categoria;
import com.projetin.projetospringangular.model.Produto;
import com.projetin.projetospringangular.service.ProdutoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/produtos")
@RequiredArgsConstructor
public class ProdutoController {

private final ProdutoService service;

    @PostMapping("/lote")
    public ResponseEntity<List<Produto>> criarEmLote(@RequestBody @Valid List<Produto> produtos){
        List<Produto> produtosSalvos = service.salvarEmLote(produtos);
        return ResponseEntity.status(HttpStatus.CREATED).body(produtosSalvos);
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody @Valid Produto produto){
        Produto novoProduto = service.salvar(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        List<Produto> produtos = service.listarTodos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/baixoestoque")
    public ResponseEntity<List<Produto>> produtosComBaixoEstoque() {
        List<Produto> produtos = service.listarProdutosBaixoEstoque();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/filtro/{categoria}")
    public ResponseEntity<List<Produto>> buscarPorCategoria(@PathVariable Categoria categoria){
        List<Produto> produtos = service.buscarPorCategoria(categoria);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> pegarPorId(@PathVariable Long id){
        Produto produto = service.buscarPorId(id);
        return ResponseEntity.ok(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> alterar(@PathVariable Long id, @RequestBody @Valid Produto produto){
        Produto produtoSalvo = service.alterarProduto(id, produto);
        return ResponseEntity.ok(produtoSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        service.deletarProduto(id);
        return ResponseEntity.noContent().build();
    }

}
