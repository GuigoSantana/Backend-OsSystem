import { PrismaClient } from "@prisma/client";
import { ProdutoData, ProdutoDataUpdate } from "../types/types";
import { ConflictError, NotFoundError } from "../utils/errors";

const prisma = new PrismaClient();

export const ProdutoService = {
  async criarProduto(data: ProdutoData) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: data.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    return await prisma.produto.create({ data });
  },

  async editarProduto(data: ProdutoDataUpdate) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: data.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    const produto = await prisma.produto.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!produto) {
      throw new NotFoundError("O produto não foi encontrado.");
    }
    return await prisma.produto.update({ where: { id: data.id }, data });
  },

  async listarProdutos(usuarioId: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    return await prisma.produto.findMany({ where: { usuarioId } });
  },

  async excluirProduto(id: string, usuarioId: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    const produto = await prisma.produto.findUnique({
      where: { id },
    });
    if (!produto) {
      throw new ConflictError("Produto não encontrado.");
    }
    return await prisma.produto.delete({ where: { id } });
  },

  async buscarPorId(id: string, usuarioId: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    const produto = await prisma.produto.findUnique({
      where: { id },
    });
    if (!produto) {
      throw new ConflictError("Produto não encontrado.");
    }
    return await prisma.produto.findUnique({ where: { id } });
  },
};
