import { Component, OnInit, ChangeDetectorRef, inject} from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-produto-list.component',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.css',
})
export class ProdutoListComponent implements OnInit{

  produtos: Produto[] = [];

  produtoTeste: Produto = {
  nome: 'nome estatico',
  categoria: 'COZINHA',
  descricao: 'descrição do produto',
  preco: 299.90,
  quantidadeEstoque: 1,
  codigoBarras: '7891234567890',
  ativo: true
};

produtoTesteAlterado: Produto = {
  nome: 'nome alterado',
  categoria: 'COZINHA',
  descricao: 'alterado',
  preco: 500.90,
  quantidadeEstoque: 2000,
  codigoBarras: 'alterado',
  ativo: true
};



  private cdr = inject(ChangeDetectorRef); // Injeta o "fiscal" de mudanças
  private produtoService = inject(ProdutoService);

  ngOnInit(){
    this.listarProdutos();
  }

  listarProdutos(){
    this.produtoService.listarTodos().subscribe({
      next: (dados) => this.produtos = dados,
      error: (err) => console.error("Erro ao buscar produtos", err)
    });
  }

alterarProduto(id: number, produto: Produto) {
  this.produtoService.alterar(id, this.produtoTesteAlterado).subscribe({
    next: (res) => {
      console.log(`Produto ${id} alterado com sucesso!`, res);
      const index = this.produtos.findIndex(p => p.id === id);
      if (index !== -1) {
        this.produtos[index] = res; 

      }
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(`Erro ao atualizar ${id}`, err);
    }
  });
}

  criarProduto(produto:Produto){
    this.produtoService.criar(produto).subscribe({
      next:(res)=>{ 
        console.log("Produto criado com sucesso!", res);
        this.produtos.push(res);
        this.cdr.detectChanges();
      },
      error:(err) => {
        console.error("Erro ao criar",err);
      }
    })
  }

  excluirProduto(id:number){
    this.produtoService.deletar(id).subscribe({
      next:() => {
        this.produtos = this.produtos.filter(p => p.id != id);
        this.cdr.detectChanges();
        console.log('Tentou deletar o ID:', id);
        console.log('Lista agora tem:', this.produtos.length, 'itens');
      },
      error: (err) => console.error("Erro ao apagar produto", err)
    })
  }
}
