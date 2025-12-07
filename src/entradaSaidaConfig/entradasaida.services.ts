import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const EntradaSaidaService = {
  async criarEntrada(data: { nome: string; preco: number; usuarioId: string }) {
    return await prisma.entrada.create({ data });
  },
  async excluirEntrada(id: string) {
    return await prisma.entrada.delete({ where: { id } });
  },
  async listarEntradas() {
    return await prisma.entrada.findMany();
  },
  async criarSaida(data: { nome: string; preco: number; usuarioId: string }) {
    return await prisma.saida.create({ data });
  },
  async excluirSaida(id: string) {
    return await prisma.saida.delete({ where: { id } });
  },
  async listarSaidas() {
    return await prisma.saida.findMany();
  },
};
