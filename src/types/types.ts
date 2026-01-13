export type ProdutoData = {
  nome: string;
  precoVenda: number;
  precoCusto: number;
  descricao?: string;
  estoque: number;
  usuarioId: string;
};

export type ProdutoDataUpdate = {
  id: string;
  nome?: string;
  precoVenda?: number;
  precoCusto?: number;
  descricao?: string;
  estoque?: number;
  usuarioId: string;
};

export type ClienteData = {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  usuarioId: string;
};

export type ClienteDataUpdate = {
  id: string;
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;
  usuarioId: string;
};


