import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();
type StatusOrdem = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";

export const OrdemService = {
  async criar(data: {
    clienteId: string;
    status: StatusOrdem;
    descricao: string;
    produtos?: { produtoId: string }[];
    servicos?: { servicoId: string }[];
  }) {
    return await prisma.ordem.create({
      data: {
        clienteId: data.clienteId,
        status: data.status,
        descricao: data.descricao,
        produtos: {
          create: data.produtos?.map((p) => ({
            produto: {
              connect: {
                id: p.produtoId,
              },
            },
          })),
        },
        servicos: {
          create: data.servicos?.map((s) => ({
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
  async editar(
    id: string,
    data: {
      status?: StatusOrdem;
      descricao?: string;
    }
  ) {
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
  async excluir(id: string) {
    return await prisma.ordem.delete({where: {id: id}});
  },
};
