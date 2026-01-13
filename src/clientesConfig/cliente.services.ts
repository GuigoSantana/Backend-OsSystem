import { PrismaClient } from "@prisma/client";
import { ConflictError, NotFoundError } from "../utils/errors";
import { ClienteData, ClienteDataUpdate } from "../types/types";

const prisma = new PrismaClient();

export const ClienteService = {
  async criarCliente(data: ClienteData) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: data.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    const clienteJaExiste = await prisma.cliente.findUnique({
      where: { cpf: data.cpf },
    });
    if (clienteJaExiste) {
      throw new ConflictError("O Cliente já está cadastrado.");
    }
    return await prisma.cliente.create({ data });
  },

  async editarCliente(data: ClienteDataUpdate) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: data.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    const cliente = await prisma.cliente.findUnique({
      where: { id: data.id },
    });
    if (!cliente) {
      throw new NotFoundError("O Cliente não foi encontrado.");
    }
    return await prisma.cliente.update({ where: { id: data.id }, data });
  },

  async listarClientes(usuarioId: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    return await prisma.cliente.findMany({ where: { usuarioId } });
  },

  async excluirCliente(id: string, usuarioId: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    const cliente = await prisma.cliente.findUnique({
      where: { id },
    });
    if (!cliente) {
      throw new ConflictError("Cliente não encontrado.");
    }
    return await prisma.cliente.delete({ where: { id, usuarioId } });
  },

  async buscarClienteId(id: string, usuarioId: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });
    if (!usuario) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    const cliente = await prisma.cliente.findUnique({
      where: { id },
    });
    if (!cliente) {
      throw new ConflictError("Cliente não encontrado.");
    }
    return await prisma.cliente.findUnique({ where: { id } });
  },
};
