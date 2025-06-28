import { FastifyRequest, FastifyReply } from "fastify";
import { OrdemService } from "./ordens.services";

export const OrdemController = {
  async criar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { clienteId, status, descricao, produtos, servicos } =
        req.body as any;
      const ordem = await OrdemService.criar({ clienteId, status, descricao });
      return replay.code(201).send(ordem);
    } catch (err) {
      return replay
        .code(400)
        .send({ message: "Erro ao criar ordem.", detalhes: err });
    }
  },
  async listar(_: FastifyRequest, replay: FastifyReply) {
    try {
      const ordens = await OrdemService.listar();
      return replay.code(201).send(ordens);
    } catch (err) {
      return replay
        .code(400)
        .send({ message: "Erro ao listar ordem.", detalhes: err });
    }
  },
  async editar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { id, status, descricao } = req.body as any;

      const ordem = await OrdemService.editar(id, { status, descricao });
      return replay.code(201).send(ordem);
    } catch (err) {
      return replay
        .code(400)
        .send({ message: "Erro ao editar ordem.", detalhes: err });
    }
  },
  async excluir(req: FastifyRequest<{Params: {id: string}}>, replay: FastifyReply) {
    try {
      const id = String(req.params.id) as any;

      const ordem = await OrdemService.excluir(id);
      return replay.send("Ordem excluida com sucesso.");
    } catch (err) {
      return replay
        .code(400)
        .send({ message: "Erro ao editar ordem.", detalhes: err });
    }
  },
};
