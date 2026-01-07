import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule, Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog'; // Corrigido para Module
import { RippleModule } from 'primeng/ripple'; // Corrigido para Module
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Corrigido para Module
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag'; // Corrigido para Module
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber'; // Corrigido para Module
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';

export interface Produto {
  id?: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  codigoBarras?: string;
  ativo: boolean;
}

interface Column {
    field: string;
    header: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-produtos-crud', // Certifique-se que bate com o seletor usado onde vc chama esse componente
    templateUrl: 'table-products-demo.component.html',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        DialogModule,
        RippleModule,
        SelectModule,
        ToastModule,
        ToolbarModule,
        ConfirmDialogModule,
        InputTextModule,
        TextareaModule,
        TagModule,
        InputTextModule,
        FormsModule,
        InputNumberModule,
        IconFieldModule,
        InputIconModule,
        ButtonModule,
        CheckboxModule
    ],
    providers: [MessageService, ConfirmationService],
    styles: [
        `:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})

export class TableProductsDemo implements OnInit {
    productDialog: boolean = false;

    produtos!: Produto[];

    produto!: Produto;

    selectedProducts!: Produto[] | null;

    submitted: boolean = false;

    categorias: any[] = [
        { label: 'Papelaria', value: 'PAPELARIA' },
        { label: 'Cozinha', value: 'COZINHA' },
        { label: 'Brinquedos', value: 'BRINQUEDOS' },
        { label: 'Decoração', value: 'DECORACAO' },
        { label: 'Eletrônicos', value: 'ELETRONICOS' }
    ];

    @ViewChild('dt') dt!: Table;

    cols!: Column[];

    exportColumns!: ExportColumn[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.produtos = [
            {
                id: 1000,
                codigoBarras: 'f230fh0g3',
                nome: 'Relógio de Bambu',
                descricao: 'Descrição do produto aqui',
                preco: 65,
                categoria: 'DECORACAO',
                quantidadeEstoque: 24,
                ativo: true
            },
            {
                id: 1001,
                codigoBarras: 'nvklal433',
                nome: 'Pulseira Preta',
                descricao: 'Descrição do produto aqui',
                preco: 72,
                categoria: 'ELETRONICOS',
                quantidadeEstoque: 0,
                ativo: true
            },
            {
                id: 1002,
                codigoBarras: 'zz21cz3c1',
                nome: 'Caderno Azul',
                descricao: 'Caderno de anotações',
                preco: 15.50,
                categoria: 'PAPELARIA',
                quantidadeEstoque: 5,
                ativo: false
            }
        ];

        this.cols = [
            { field: 'codigoBarras', header: 'Cód. Barras' },
            { field: 'nome', header: 'Nome' },
            { field: 'preco', header: 'Preço' },
            { field: 'categoria', header: 'Categoria' },
            { field: 'quantidadeEstoque', header: 'Estoque' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
        this.cd.markForCheck();
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    openNew() {
        this.produto = {
            nome: '',
            descricao: '',
            categoria: 'PAPELARIA',
            preco: 0,
            quantidadeEstoque: 0,
            ativo: true
        };
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(produto: Produto) {
        this.produto = { ...produto };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir os produtos selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Não',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Sim'
            },
            accept: () => {
                this.produtos = this.produtos.filter((val) => !this.selectedProducts?.includes(val));
                this.selectedProducts = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Produtos Excluídos',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(produto: Produto) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir ' + produto.nome + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Não',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Sim'
            },
            accept: () => {
                this.produtos = this.produtos.filter((val) => val.id !== produto.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Produto Excluído',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.produtos.length; i++) {
            if (this.produtos[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    createId(): number {
        return Math.floor(Math.random() * 10000);
    }

    getSeverity(quantidade: number) {
        if (quantidade === 0) return 'danger';
        if (quantidade > 0 && quantidade < 10) return 'warn';
        return 'success';
    }

    getStatusLabel(quantidade: number): string {
        if (quantidade === 0) return 'Esgotado';
        if (quantidade > 0 && quantidade < 10) return 'Baixo Estoque';
        return 'Disponível';
    }

    saveProduct() {
        this.submitted = true;

        if (this.produto.nome?.trim()) {
            if (this.produto.id) {
                this.produtos[this.findIndexById(this.produto.id)] = this.produto;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Produto Atualizado',
                    life: 3000
                });
            } else {
                this.produto.id = this.createId();
                this.produtos.push(this.produto);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Produto Criado',
                    life: 3000
                });
            }

            this.produtos = [...this.produtos];
            this.productDialog = false;
        }
    }
}