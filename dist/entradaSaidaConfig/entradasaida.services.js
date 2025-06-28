"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntradaSaidaService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.EntradaSaidaService = {
    async criarEntrada(data) {
        return await prisma.entradas.create({ data });
    },
    async excluirEntrada(id) {
        return await prisma.entradas.delete({ where: { id } });
    },
    async listarEntradas() {
        return await prisma.entradas.findMany();
    },
    async criarSaida(data) {
        return await prisma.saidas.create({ data });
    },
    async excluirSaida(id) {
        return await prisma.saidas.delete({ where: { id } });
    },
    async listarSaidas() {
        return await prisma.saidas.findMany();
    },
};
