import { PrismaClient } from "@prisma/client";
import { ConflictError, NotFoundError } from "../utils/errors";

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
    const usuario = await prisma.usuario.findUnique({
      where: { id: data.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    const clienteJaExiste = await prisma.cliente.findUnique({
      where: { cpf: data.cpf },
    });
    if(clienteJaExiste){
      throw new ConflictError("O Cliente já está cadastrado.")
    }

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

  async listar(usuarioId: string) {
    return await prisma.cliente.findMany({ where: { usuarioId } });
  },

  async excluir(id: string) {
    return await prisma.cliente.delete({ where: { id } });
  },

  async buscarId(id: string) {
    return await prisma.cliente.findUnique({ where: { id } });
  },
};
