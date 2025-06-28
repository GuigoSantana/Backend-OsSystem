import { FastifyRequest, FastifyReply } from "fastify";
import { ProdutoService } from "./produto.services";

export const ProdutoController = {
  async criar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { title, precoc, precov, descricao, estoque, usuarioId } =
        req.body as any;
      const cliente = await ProdutoService.criarProduto({
        title,
        precov,
        precoc,
        descricao,
        estoque,
        usuarioId,
      });
      return replay.code(201).send(cliente);
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao criar produto.", detalhes: err });
    }
  },

  async editar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { id, title, precov, precoc, descricao, estoque } = req.body as any;
      const produtoEditado = await ProdutoService.editarProduto(id, {
        title,
        precoc,
        precov,
        descricao,
        estoque,
      });
      return replay.send(produtoEditado);
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao editar produto.", detalhes: err });
    }
  },

  async excluir(
    req: FastifyRequest<{ Params: { id: string } }>,
    replay: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      await ProdutoService.excluirProduto(id);
      return replay.send({ menssage: "Produto excluido com sucesso!" });
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao excluir produto.", detalhes: err });
    }
  },
  async listar(_: FastifyRequest, replay: FastifyReply) {
    try {
      const produtos = await ProdutoService.listarProdutos();
      return replay.send(produtos);
    } catch (err) {
      return replay
        .code(500)
        .send({ erro: "Erro ao listar produtos.", detalhes: err });
    }
  },
  async buscarId(
    req: FastifyRequest<{ Params: { id: string } }>,
    replay: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      const cliente = await ProdutoService.buscarPorId(id);
      if (!cliente)
        return replay.code(404).send({ erro: "Produto não encontrado." });
      return replay.send(cliente);
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao buscar produtos.", detalhes: err });
    }
  },
};
