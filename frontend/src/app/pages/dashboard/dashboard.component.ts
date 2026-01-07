import { Component, OnInit } from '@angular/core';
import { Produto } from '../table-products-demo/table-products-demo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  produtos: Produto[] = [];
  totalProdutos = 0;
  produtosAtivos = 0;
  produtosInativos = 0;
  valorEstoque = 0;

  categoriasResumo: { nome: string; quantidade: number; percentual: number }[] = [];
  percentualAtivos = 0;
  percentualInativos = 0;

  estoqueBaixo: Produto[] = [];


  ngOnInit(): void {
    this.carregarProdutos();
    this.calcularMetricas();
    this.calcularGraficos();
    this.filtrarEstoqueBaixo();

  }

  carregarProdutos() {
    // mock (portfólio ✔️)
    this.produtos = [
      { nome: 'Teclado', categoria: 'Eletrônicos', descricao: '', preco: 199, quantidadeEstoque: 10, ativo: true },
      { nome: 'Mouse', categoria: 'Eletrônicos', descricao: '', preco: 99, quantidadeEstoque: 5, ativo: true },
      { nome: 'Camiseta', categoria: 'Roupas', descricao: '', preco: 59, quantidadeEstoque: 0, ativo: false }
    ];
  }

  calcularMetricas() {
    this.totalProdutos = this.produtos.length;

    this.produtosAtivos = this.produtos.filter(p => p.ativo).length;
    this.produtosInativos = this.produtos.filter(p => !p.ativo).length;

    this.valorEstoque = this.produtos.reduce((total, p) => {
      return total + (p.preco * p.quantidadeEstoque);
    }, 0);
  }

  calcularGraficos() {
    // ---- Produtos por categoria ----
    const total = this.produtos.length;
    const mapaCategorias: Record<string, number> = {};

    this.produtos.forEach(produto => {
      mapaCategorias[produto.categoria] =
        (mapaCategorias[produto.categoria] || 0) + 1;
    });

    this.categoriasResumo = Object.keys(mapaCategorias).map(categoria => ({
      nome: categoria,
      quantidade: mapaCategorias[categoria],
      percentual: (mapaCategorias[categoria] / total) * 100
    }));

    // ---- Ativos x Inativos ----
    this.percentualAtivos = (this.produtosAtivos / total) * 100;
    this.percentualInativos = (this.produtosInativos / total) * 100;
  }

  filtrarEstoqueBaixo() {
    this.estoqueBaixo = this.produtos.filter(p => p.quantidadeEstoque > 0 && p.quantidadeEstoque <= 5);
  }


}
