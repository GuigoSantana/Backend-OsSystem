"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.AuthService = {
    async criar(data) {
        return await prisma.usuario.create({ data });
    },
    async login(data) {
        return await prisma.usuario.findUnique({ where: { email: data.email } });
    }
};
