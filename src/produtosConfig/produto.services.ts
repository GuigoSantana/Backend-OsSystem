import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ProdutoService = {
  async criarProduto(data: {
    title: string;
    precov: string;
    precoc: string;
    descricao: string;
    estoque: string;
  }) {
    return await prisma.produto.create({ data });
  },

  async editarProduto(
    id: string,
    data: {
      title?: string;
      precov?: string;
      precoc?: string;
      descricao?: string;
      estoque?: string;
    }
  ) {
    return await prisma.produto.update({ where: { id }, data });
  },

  async listarProdutos() {
    return await prisma.produto.findMany();
  },

  async excluirProduto(id: string) {
    return await prisma.produto.delete({ where: { id } });
  },

  async buscarPorId(id: string) {
    return await prisma.produto.findUnique({ where: { id } });
  },
};
