import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { TagModule } from 'primeng/tag';
import { RouterLink } from "@angular/router";

// Registra o formato brasileiro para números e moedas
registerLocaleData(localePt);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TagModule, RouterLink],
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

  cores = [
  '#1976d2', // azul
  '#2e7d32', // verde
  '#f9a825', // amarelo
  '#8e24aa', // roxo
  '#c62828', // vermelho
  ];

  constructor(
    private produtoService: ProdutoService,
    private cd: ChangeDetectorRef // Injetado para garantir que os valores apareçam na tela
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.produtoService.listarTodos().subscribe({
      next: (dados) => {
        if (dados) {
          this.produtos = dados;
          this.executarLogicaDashboard();
          // Força o Angular a atualizar os componentes (cards)
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  executarLogicaDashboard() {
    this.calcularMetricas();
    this.calcularGraficos();
    this.filtrarEstoqueBaixo();
  }

  calcularMetricas() {
    this.totalProdutos = this.produtos.length;
    this.produtosAtivos = this.produtos.filter(p => p.ativo).length;
    this.produtosInativos = this.produtos.filter(p => !p.ativo).length;
    
    this.valorEstoque = this.produtos.reduce((total, p) => {
      const preco = p.preco || 0;
      const qtd = p.quantidadeEstoque || 0;
      return total + (preco * qtd);
    }, 0);
  }

  calcularGraficos() {
    const total = this.produtos.length;
    if (total === 0) return;

    const mapaCategorias: Record<string, number> = {};
    this.produtos.forEach(produto => {
      const cat = produto.categoria || 'Outros';
      mapaCategorias[cat] = (mapaCategorias[cat] || 0) + 1;
    });

    this.categoriasResumo = Object.keys(mapaCategorias).map(categoria => ({
      nome: categoria,
      quantidade: mapaCategorias[categoria],
      percentual: (mapaCategorias[categoria] / total) * 100
    }));

    this.percentualAtivos = (this.produtosAtivos / total) * 100;
    this.percentualInativos = (this.produtosInativos / total) * 100;
  }

  filtrarEstoqueBaixo() {
    // Pega produtos com 5 ou menos unidades no estoque
    this.estoqueBaixo = this.produtos.filter(p => p.quantidadeEstoque !== undefined && p.quantidadeEstoque <= 5);
  }

   getSeverity(quantidade: number) {
     if (quantidade === 0) return 'danger';
     if (quantidade < 10) return 'warn';
     return 'success';
   }

  getStatusLabel(quantidade: number): string {
    if (quantidade === 0) return 'Esgotado';
    if (quantidade < 10) return 'Baixo Estoque';
    return 'Disponível';
  }
}