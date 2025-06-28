"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.servicoService = {
    async criar(data) {
        return await prisma.servico.create({ data });
    },
    async editar(id, data) {
        return await prisma.servico.update({ where: { id }, data });
    },
    async listar() {
        return await prisma.servico.findMany();
    },
    async buscarId(id) {
        return await prisma.servico.findUnique({ where: { id } });
    },
    async excluir(id) {
        return await prisma.servico.delete({ where: { id } });
    },
};
