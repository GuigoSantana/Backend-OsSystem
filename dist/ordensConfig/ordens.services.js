"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdemService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.OrdemService = {
    async criar(data) {
        var _a, _b;
        return await prisma.ordem.create({
            data: {
                usuarioId: data.usuarioId,
                clienteId: data.clienteId,
                status: data.status,
                descricao: data.descricao,
                produtos: {
                    create: (_a = data.produtos) === null || _a === void 0 ? void 0 : _a.map((p) => ({
                        produto: {
                            connect: {
                                id: p.produtoId,
                            },
                        },
                    })),
                },
                servicos: {
                    create: (_b = data.servicos) === null || _b === void 0 ? void 0 : _b.map((s) => ({
                        servico: {
                            connect: {
                                id: s.servicoId,
                            },
                        },
                    })),
                },
            },
        });
    },
    async editar(id, data) {
        return await prisma.ordem.update({
            where: { id },
            data,
        });
    },
    async listar() {
        return await prisma.ordem.findMany({
            include: {
                cliente: true,
                produtos: { include: { produto: true } },
                servicos: { include: { servico: true } },
            },
        });
    },
    async excluir(id) {
        return await prisma.ordem.delete({ where: { id: id } });
    },
};
