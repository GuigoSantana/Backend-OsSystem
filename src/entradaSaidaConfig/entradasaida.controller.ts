import { FastifyRequest, FastifyReply } from "fastify";
import { EntradaSaidaService } from "./entradasaida.services";

export const EntradaSaidaController = {
  async criarEntrada(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { title, preco, usuarioId } = req.body as any;
      const entrada = await EntradaSaidaService.criarEntrada({
        title,
        preco,
        usuarioId
      });
      return replay.code(201).send(entrada);
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao criar entrada.", detalhes: err });
    }
  },

  async excluirEntrada(
    req: FastifyRequest<{ Params: { id: string } }>,
    replay: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      await EntradaSaidaService.excluirEntrada(id);
      return replay.send({ menssage: "Entrada excluida com sucesso!" });
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao excluir entrada.", detalhes: err });
    }
  },

  async listarEntradas(_: FastifyRequest, replay: FastifyReply) {
    try {
      const entradas = await EntradaSaidaService.listarEntradas();
      return replay.send(entradas);
    } catch (err) {
      return replay
        .code(400)
        .send({ menssage: "Erro ao listar entradas.", detalhes: err });
    }
  },

  async criarSaida(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { title, preco, usuarioId } = req.body as any;
      const saida = await EntradaSaidaService.criarSaida({
        title,
        preco,
        usuarioId
      });
      return replay.code(201).send(saida);
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao criar saida.", detalhes: err });
    }
  },

  async excluirSaida(
    req: FastifyRequest<{ Params: { id: string } }>,
    replay: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      await EntradaSaidaService.excluirSaida(id);
      return replay.send({ menssage: "Saida excluida com sucesso!" });
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao excluir saida.", detalhes: err });
    }
  },

  async listarSaidas(_: FastifyRequest, replay: FastifyReply) {
    try {
      const saidas = await EntradaSaidaService.listarSaidas();
      return replay.send(saidas);
    } catch (err) {
      return replay
        .code(400)
        .send({ menssage: "Erro ao listar saidas.", detalhes: err });
    }
  },
};
