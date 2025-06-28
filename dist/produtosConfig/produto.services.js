"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.ProdutoService = {
    async criarProduto(data) {
        return await prisma.produto.create({ data });
    },
    async editarProduto(id, data) {
        return await prisma.produto.update({ where: { id }, data });
    },
    async listarProdutos() {
        return await prisma.produto.findMany();
    },
    async excluirProduto(id) {
        return await prisma.produto.delete({ where: { id } });
    },
    async buscarPorId(id) {
        return await prisma.produto.findUnique({ where: { id } });
    },
};
