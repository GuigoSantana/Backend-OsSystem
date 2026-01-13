import { FastifyRequest, FastifyReply } from "fastify";
import { ProdutoService } from "./produto.services";
import { ProdutoData, ProdutoDataUpdate } from "../types/types";
import { UserToken } from "../types/userTokenType";

export const ProdutoController = {
  async criarProduto(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, precoVenda, precoCusto, descricao, estoque } =
        req.body as ProdutoData;
      const user = req.user as UserToken;
      const usuarioId = user.sub;
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

  async editarProduto(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      const { nome, precoVenda, precoCusto, descricao, estoque } =
        req.body as ProdutoDataUpdate;
      const user = req.user as UserToken;
      const usuarioId = user.sub;
      const produtoEditado = await ProdutoService.editarProduto({
        id,
        nome,
        precoVenda: precoVenda !== undefined ? Number(precoVenda) : undefined,
        precoCusto: precoCusto !== undefined ? Number(precoCusto) : undefined,
        descricao,
        estoque: estoque !== undefined ? Number(estoque) : undefined,
        usuarioId
      });
      return reply.send(produtoEditado);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao editar produto.", detalhes: err });
    }
  },

  async excluirProduto(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      const user = req.user as UserToken;
      const usuarioId = user.sub;
      await ProdutoService.excluirProduto(id, usuarioId);
      return reply.send({ message: "Produto excluido com sucesso!" });
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao excluir produto.", detalhes: err });
    }
  },
  async listarProdutos(req: FastifyRequest, reply: FastifyReply) {
    try {
      const user = req.user as UserToken;
      const usuarioId = user.sub;
      const produtos = await ProdutoService.listarProdutos(usuarioId);
      return reply.code(201).send(produtos);
    } catch (err) {
      return reply
        .code(500)
        .send({ erro: "Erro ao listar produtos.", detalhes: err });
    }
  },
  async buscarProdutoId(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      const user = req.user as UserToken;
      const usuarioId = user.sub;
      const cliente = await ProdutoService.buscarPorId(id, usuarioId);
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
