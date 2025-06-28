import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const EntradaSaidaService = {
  async criarEntrada(data: { title: string; preco: string; usuarioId: string }) {
    return await prisma.entradas.create({ data });
  },
  async excluirEntrada(id: string) {
    return await prisma.entradas.delete({ where: { id } });
  },
  async listarEntradas() {
    return await prisma.entradas.findMany();
  },
  async criarSaida(data: { title: string; preco: string; usuarioId: string }) {
    return await prisma.saidas.create({ data });
  },
  async excluirSaida(id: string) {
    return await prisma.saidas.delete({ where: { id } });
  },
  async listarSaidas() {
    return await prisma.saidas.findMany();
  },
};
