import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ClienteService = {
  async criar(data: {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    endereco: string;
    usuarioId: string;
  }) {
    return await prisma.cliente.create({ data });
  },


  async editar(
    id: string,
    data: {
      nome?: string;
      email?: string;
      cpf?: string;
      telefone?: string;
      endereco?: string;
    }
  ) {
    return await prisma.cliente.update({ where: { id }, data });
  },

  async listar(id: string) {
    return await prisma.cliente.findMany({where: { usuarioId: id }});
  },

  async excluir(id: string) {
    return await prisma.cliente.delete({ where: { id } });
  },

  async buscarId(id: string) {
    return await prisma.cliente.findUnique({ where: { id } });
  },
};
