export interface Produto {
  id?: number;              // Long -> number (o ? é porque no POST o ID não existe ainda)
  nome: string;             // String -> string
  categoria: string;        // O Enum no TS tratamos como string inicialmente para simplificar
  descricao: string;
  preco: number;            // BigDecimal -> number
  quantidadeEstoque: number; // Integer -> number
  codigoBarras?: string;    // String -> string (opcional conforme seu desafio)
  ativo: boolean;           // Boolean -> boolean
}

