import { FastifyRequest, FastifyReply } from "fastify";
import { ProdutoService } from "./produto.services";
import { ProdutoData, ProdutoUpdateData } from "../interfaces/interfaces";

export const ProdutoController = {
  async criar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, precoVenda, precoCusto, descricao, estoque, usuarioId } =
        req.body as ProdutoData;

      const cliente = await ProdutoService.criarProduto({
        nome,
        precoVenda: Number(precoVenda),
        precoCusto: Number(precoCusto),
        descricao,
        estoque: Number(estoque),
        usuarioId,
      });
      return reply.code(201).send(cliente);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao criar produto.", detalhes: err });
    }
  },

  async editar(req: FastifyRequest<{ Params: {id: string}}>, reply: FastifyReply) {
    try {
      const id = String(req.params.id)
      const { nome, precoVenda, precoCusto, descricao, estoque } = req.body as ProdutoUpdateData;
      const produtoEditado = await ProdutoService.editarProduto(id, {
        nome,
        precoVenda: precoVenda !== undefined ? Number(precoVenda) : undefined,
        precoCusto: precoCusto !== undefined ? Number(precoCusto) : undefined,
        descricao,
        estoque: estoque !== undefined ? Number(estoque) : undefined,
      });
      return reply.send(produtoEditado);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao editar produto.", detalhes: err });
    }
  },

  async excluir(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      await ProdutoService.excluirProduto(id);
      return reply.send({ message: "Produto excluido com sucesso!" });
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao excluir produto.", detalhes: err });
    }
  },
  async listar(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    try {
      const usuarioId = req.params.id;
      if(!usuarioId) return reply.code(422).send({ erro: "Informe o parâmetro id do usuário"});
      const produtos = await ProdutoService.listarProdutos(usuarioId);
      return reply.send(produtos);
    } catch (err) {
      return reply
        .code(500)
        .send({ erro: "Erro ao listar produtos.", detalhes: err });
    }
  },
  async buscarId(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      const cliente = await ProdutoService.buscarPorId(id);
      if (!cliente)
        return reply.code(404).send({ erro: "Produto não encontrado." });
      return reply.send(cliente);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao buscar produtos.", detalhes: err });
    }
  },
};
