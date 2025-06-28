import { FastifyRequest, FastifyReply } from "fastify";
import { ClienteService } from "./cliente.services";

export const ClienteController = {
  async criar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { nome, email, cpf, telefone, endereco, usuarioId } = req.body as any;
      const cliente = await ClienteService.criar({
        nome,
        email,
        cpf,
        telefone,
        endereco,
        usuarioId,
      });
      return replay.code(201).send(cliente);
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao criar cliente.", detalhes: err });
    }
  },

  async editar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { id, nome, email, cpf, telefone, endereco } = req.body as any;
      const clienteEditado = await ClienteService.editar(id, {
        nome,
        email,
        endereco,
        cpf,
        telefone,
      });
      return replay.send(clienteEditado);
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao editar cliente.", detalhes: err });
    }
  },

  async excluir(req: FastifyRequest<{ Params: { id: string } }>, replay: FastifyReply) {
    try {
      const id = String(req.params.id) 
      await ClienteService.excluir(id);
      return replay.send({menssage: "Cliente excluido com sucesso!"});
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao excluir cliente.", detalhes: err });
    }
  },
  async listar(req: FastifyRequest<{ Params: { id: string } }>, replay: FastifyReply) {
    try {
      const usuarioId = req.params.id;
      const clientes = await ClienteService.listar(usuarioId);
      return replay.send(clientes);
    } catch (err) {
      return replay
      .code(500)
      .send({ erro: "Erro ao listar cliente.", detalhes: err });
    }
  },
  async buscarId(req: FastifyRequest<{ Params: { id: string } }>, replay: FastifyReply) {
    try {
      const id = String(req.params.id) 
      const cliente = await ClienteService.buscarId(id);
      if (!cliente) return replay.code(404).send({erro: "Cliente não encontrado."});
      return replay.send(cliente)
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao buscar cliente.", detalhes: err });
    }
  },

};
