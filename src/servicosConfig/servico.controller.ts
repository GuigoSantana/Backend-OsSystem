import { FastifyRequest, FastifyReply } from "fastify";
import { servicoService } from "./servico.services";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";

export const servicoController = {
  async criar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { title, preco, descricao, usuarioId } = req.body as any;
      const servico = await servicoService.criar({ title, preco, descricao, usuarioId });
      return replay.code(201).send(servico);
    } catch (err) {
      return replay
        .code(400)
        .send({ message: "Erro ao criar servicço.", detalhes: err });
    }
  },
  async editar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { id, title, preco, descricao } = req.body as any;
      const servicoEditado = await servicoService.editar(id, {
        title,
        preco,
        descricao,
      });
      return replay.code(200).send(servicoEditado)
    } catch (err) {
        return replay.code(400).send({message: "Erro ao editar serviço.", detalhes: err})
    }
  },
  async listar(_: FastifyRequest, replay: FastifyReply){
    try {
        const servicos = await servicoService.listar()
        return replay.code(200).send(servicos)
    } catch (err) {
        return replay.code(400).send({message: "Erro ao listar serviços.", detalhes: err})
    }
  },
  async buscarId(req: FastifyRequest<{Params: {id: string}}>, replay: FastifyReply){
    try {
        const id = String(req.params.id)
        const servico = await servicoService.buscarId(id)
        return replay.code(200).send(servico)
    } catch (err) {
        return replay.code(400).send({message: "Erro ao buscar serviço."})
    }
  },
  async excluir(req: FastifyRequest<{Params: {id: string}}>, replay: FastifyReply){
    try {
        const id = String(req.params.id)
        await servicoService.excluir(id)
        return replay.code(200).send({message: "Serviço excluido com sucesso."})
    } catch (err) {
        return replay.code(400).send({message: "Erro ao excluir serviço."})
    }
  },
};
