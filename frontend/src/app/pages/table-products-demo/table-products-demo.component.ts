import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';

// Model e Service
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';

@Component({
    selector: 'app-produtos-crud',
    templateUrl: 'table-products-demo.component.html',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, DialogModule, RippleModule,
        SelectModule, ToastModule, ToolbarModule, ConfirmDialogModule,
        InputTextModule, TextareaModule, TagModule, InputNumberModule,
        IconFieldModule, InputIconModule, ButtonModule, CheckboxModule
    ],
    providers: [MessageService, ConfirmationService],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class TableProductsDemo implements OnInit {
    @ViewChild('dt') dt!: Table;

    produtos: Produto[] = [];
    produto: Produto = {} as Produto;
    selectedProducts: Produto[] | null = null;
    submitted: boolean = false;
    productDialog: boolean = false;

    categorias = [
        { label: 'Papelaria', value: 'PAPELARIA' },
        { label: 'Cozinha', value: 'COZINHA' },
        { label: 'Brinquedos', value: 'BRINQUEDOS' },
        { label: 'Decoração', value: 'DECORACAO' },
        { label: 'Eletrônicos', value: 'ELETRONICOS' }
    ];

    cols: any[] = [];

    constructor(
        private service: ProdutoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carregarDados();
        this.cols = [
            { field: 'codigoBarras', header: 'Cód. Barras' },
            { field: 'nome', header: 'Nome' },
            { field: 'preco', header: 'Preço' },
            { field: 'categoria', header: 'Categoria' },
            { field: 'quantidadeEstoque', header: 'Estoque' }
        ];
    }

    // Carregar lista da API
    carregarDados() {
        this.service.listarTodos().subscribe({
            next: (dados) => {
                this.produtos = dados;
                this.cd.markForCheck();
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar produtos' });
                console.error(err);
            }
        });
    }

    // Salvar (Cria ou Altera)
    saveProduct() {
        this.submitted = true;

        if (this.produto.nome?.trim()) {
            if (this.produto.id) {
                // Modo Edição
                this.service.alterar(this.produto.id, this.produto).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Atualizado', life: 3000 });
                        this.fecharESincronizar();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar' })
                });
            } else {
                // Modo Criação
                this.service.criar(this.produto).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Criado', life: 3000 });
                        this.fecharESincronizar();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar' })
                });
            }
        }
    }

    // Deletar um produto
    deleteProduct(produto: Produto) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir ${produto.nome}?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.service.deletar(produto.id!).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Excluído', life: 3000 });
                        this.carregarDados();
                    }
                });
            }
        });
    }

    // Deletar selecionados (Múltiplos)
    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir os produtos selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                const idsParaDeletar = this.selectedProducts?.map(p => p.id) || [];
                
                // Nota: Idealmente seu backend teria um endpoint de delete em lote
                // Aqui deletamos um por um por simplicidade conforme seu Service atual
                idsParaDeletar.forEach(id => {
                    if (id) this.service.deletar(id).subscribe();
                });

                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produtos Excluídos', life: 3000 });
                this.selectedProducts = null;
                setTimeout(() => this.carregarDados(), 500);
            }
        });
    }

    // Métodos auxiliares de UI
    fecharESincronizar() {
        this.carregarDados();
        this.productDialog = false;
        this.produto = {} as Produto;
    }

    openNew() {
        this.produto = { ativo: true, preco: 0, quantidadeEstoque: 0 } as Produto;
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(produto: Produto) {
        this.produto = { ...produto };
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
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

    exportCSV() {
        this.dt.exportCSV();
    }
}