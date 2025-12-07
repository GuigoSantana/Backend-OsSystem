export interface ProdutoData {
  nome: string;
  precoVenda: number;
  precoCusto: number;
  descricao?: string;
  estoque: number;
  usuarioId: string;
} 

export interface ProdutoUpdateData {
  nome?: string;
  precoVenda?: number;
  precoCusto?: number;
  descricao?: string;
  estoque?: number;
}