import { FastifyRequest, FastifyReply } from "fastify";
import { EntradaSaidaService } from "./entradasaida.services";

export const EntradaSaidaController = {
  async criarEntrada(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, preco, usuarioId } = req.body as any;
      const entrada = await EntradaSaidaService.criarEntrada({
        nome,
        preco: Number(preco),
        usuarioId
      });
      return reply.code(201).send(entrada);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao criar entrada.", detalhes: err });
    }
  },

  async excluirEntrada(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      await EntradaSaidaService.excluirEntrada(id);
      return reply.send({ menssage: "Entrada excluida com sucesso!" });
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao excluir entrada.", detalhes: err });
    }
  },

  async listarEntradas(_: FastifyRequest, reply: FastifyReply) {
    try {
      const entradas = await EntradaSaidaService.listarEntradas();
      return reply.send(entradas);
    } catch (err) {
      return reply
        .code(400)
        .send({ menssage: "Erro ao listar entradas.", detalhes: err });
    }
  },

  async criarSaida(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, preco, usuarioId } = req.body as any;
      const saida = await EntradaSaidaService.criarSaida({
        nome,
        preco: Number(preco),
        usuarioId
      });
      return reply.code(201).send(saida);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao criar saida.", detalhes: err });
    }
  },

  async excluirSaida(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      await EntradaSaidaService.excluirSaida(id);
      return reply.send({ menssage: "Saida excluida com sucesso!" });
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao excluir saida.", detalhes: err });
    }
  },

  async listarSaidas(_: FastifyRequest, reply: FastifyReply) {
    try {
      const saidas = await EntradaSaidaService.listarSaidas();
      return reply.send(saidas);
    } catch (err) {
      return reply
        .code(400)
        .send({ menssage: "Erro ao listar saidas.", detalhes: err });
    }
  },
};
