"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.ClienteService = {
    async criar(data) {
        return await prisma.cliente.create({ data });
    },
    async editar(id, data) {
        return await prisma.cliente.update({ where: { id }, data });
    },
    async listar() {
        return await prisma.cliente.findMany();
    },
    async excluir(id) {
        return await prisma.cliente.delete({ where: { id } });
    },
    async buscarId(id) {
        return await prisma.cliente.findUnique({ where: { id } });
    },
};
