import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type StatusOrdem = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";

interface ProdutoPedidoInput {
  produtoId: string;
  quantidade: number;
}

interface ServicoPedidoInput {
  servicoId: string;
  quantidade: number;
}

export const OrdemService = {
  async criar(data: {
    usuarioId: string;
    clienteId: string;
    status: StatusOrdem;
    descricao: string;
    produtos?: ProdutoPedidoInput[];
    servicos?: ServicoPedidoInput[];
  }) {
    const itensProduto = data.produtos
      ? await Promise.all(
          data.produtos.map(async (item) => {
            const produtoOriginal = await prisma.produto.findUnique({
              where: { id: item.produtoId },
            });

            if (!produtoOriginal)
              throw new Error(`Produto ${item.produtoId} não encontrado`);

            return {
              produto: { connect: { id: item.produtoId } },
              quantidade: item.quantidade,
              precoUnitario: produtoOriginal.precoVenda,
            };
          })
        )
      : [];

    const itensServico = data.servicos
      ? await Promise.all(
          data.servicos.map(async (item) => {
            const servicoOriginal = await prisma.servico.findUnique({
              where: { id: item.servicoId },
            });

            if (!servicoOriginal)
              throw new Error(`Serviço ${item.servicoId} não encontrado`);

            return {
              servico: { connect: { id: item.servicoId } },
              quantidade: item.quantidade,
              precoUnitario: servicoOriginal.preco,
            };
          })
        )
      : [];

    return await prisma.ordem.create({
      data: {
        usuarioId: data.usuarioId,
        clienteId: data.clienteId,
        status: data.status,
        descricao: data.descricao,
        produtos: {
          create: itensProduto,
        },
        servicos: {
          create: itensServico,
        }
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
    return await prisma.ordem.delete({ where: { id: id } });
  },
};
