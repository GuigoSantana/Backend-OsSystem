import { FastifyRequest, FastifyReply } from "fastify";
import { servicoService } from "./servico.services";

export const servicoController = {
  async criar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, preco, descricao, usuarioId } = req.body as any;
      const servico = await servicoService.criar({ nome, preco, descricao, usuarioId });
      return reply.code(201).send(servico);
    } catch (err) {
      return reply
        .code(400)
        .send({ message: "Erro ao criar servicço.", detalhes: err });
    }
  },
  async editar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id, nome, preco, descricao } = req.body as any;
      const servicoEditado = await servicoService.editar(id, {
        nome,
        preco,
        descricao,
      });
      return reply.code(200).send(servicoEditado)
    } catch (err) {
        return reply.code(400).send({message: "Erro ao editar serviço.", detalhes: err})
    }
  },
  async listar(_: FastifyRequest, reply: FastifyReply){
    try {
        const servicos = await servicoService.listar()
        return reply.code(200).send(servicos)
    } catch (err) {
        return reply.code(400).send({message: "Erro ao listar serviços.", detalhes: err})
    }
  },
  async buscarId(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){
    try {
        const id = String(req.params.id)
        const servico = await servicoService.buscarId(id)
        return reply.code(200).send(servico)
    } catch (err) {
        return reply.code(400).send({message: "Erro ao buscar serviço."})
    }
  },
  async excluir(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){
    try {
        const id = String(req.params.id)
        await servicoService.excluir(id)
        return reply.code(200).send({message: "Serviço excluido com sucesso."})
    } catch (err) {
        return reply.code(400).send({message: "Erro ao excluir serviço."})
    }
  },
};
