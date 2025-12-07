import { PrismaClient } from "@prisma/client";
import { ProdutoData, ProdutoUpdateData } from "../interfaces/interfaces";

const prisma = new PrismaClient();

export const ProdutoService = {
  async criarProduto(data: ProdutoData) {
    return await prisma.produto.create({ data });
  },

  async editarProduto(
    id: string,
    data: ProdutoUpdateData
  ) {
    return await prisma.produto.update({ where: { id }, data });
  },

  async listarProdutos(usuarioId: string) {
    return await prisma.produto.findMany({ where: { usuarioId }});
  },

  async excluirProduto(id: string) {
    return await prisma.produto.delete({ where: { id } });
  },

  async buscarPorId(id: string) {
    return await prisma.produto.findUnique({ where: { id } });
  },
};
