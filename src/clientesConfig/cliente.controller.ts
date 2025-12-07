import { FastifyRequest, FastifyReply } from "fastify";
import { ClienteService } from "./cliente.services";

export const ClienteController = {
  async criar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, email, cpf, telefone, endereco, usuarioId } =
        req.body as any;
      const cliente = await ClienteService.criar({
        nome,
        email,
        cpf,
        telefone,
        endereco,
        usuarioId
      });
      return reply.code(201).send(cliente);

    } catch (err: any) {
      if(err.statusCode){
        return reply
        .status(err.statusCode)
        .send({ erro: err.name, mensagem: err.message });
      }

      return reply.status(500).send({
        erro: "InternalServerError",
        mensagem: "Erro inserperado no servidor."
      })
    }
  },

  async editar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id, nome, email, cpf, telefone, endereco } = req.body as any;
      const clienteEditado = await ClienteService.editar(id, {
        nome,
        email,
        endereco,
        cpf,
        telefone,
      });
      return reply.send(clienteEditado);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao editar cliente.", detalhes: err });
    }
  },

  async excluir(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      await ClienteService.excluir(id);
      return reply.send({ menssage: "Cliente excluido com sucesso!" });
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao excluir cliente.", detalhes: err });
    }
  },
  async listar(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const usuarioId = req.params.id; 
      const clientes = await ClienteService.listar(usuarioId);
      return reply.send(clientes);
    } catch (err) {
      return reply
        .code(500)
        .send({ erro: "Erro ao listar cliente.", detalhes: err });
    }
  },
  async buscarId(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      const cliente = await ClienteService.buscarId(id);
      if (!cliente)
        return reply.code(404).send({ erro: "Cliente não encontrado." });
      return reply.send(cliente);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao buscar cliente.", detalhes: err });
    }
  },
};
