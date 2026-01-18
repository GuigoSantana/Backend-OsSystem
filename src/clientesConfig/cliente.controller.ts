import { FastifyRequest, FastifyReply } from "fastify";
import { ClienteService } from "./cliente.services";
import { UserToken } from "../types/types";
import { ClienteDataUpdate, ProdutoDataUpdate } from "../types/types";
import { getReqUsuarioId } from "../utils/getReqUsuarioId";

export const ClienteController = {
  async criarCliente(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, email, cpf, telefone, endereco } = req.body as any;
      const usuarioId = getReqUsuarioId(req.user as UserToken)
      const cliente = await ClienteService.criarCliente({
        nome,
        email,
        cpf,
        telefone,
        endereco,
        usuarioId,
      });
      return reply.code(201).send(cliente);
    } catch (err: any) {
      if (err.statusCode) {
        return reply
          .status(err.statusCode)
          .send({ erro: err.name, mensagem: err.message });
      }

      return reply.status(500).send({
        erro: "InternalServerError",
        mensagem: "Erro inserperado no servidor.",
      });
    }
  },

  async editarCliente(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id)
      const { nome, email, cpf, telefone, endereco } =
        req.body as ClienteDataUpdate;
      const usuarioId = getReqUsuarioId(req.user as UserToken)
      const clienteEditado = await ClienteService.editarCliente({
        id,
        nome,
        email,
        endereco,
        cpf,
        telefone,
        usuarioId,
      });
      return reply.send(clienteEditado);
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao editar cliente.", detalhes: err });
    }
  },

  async excluirCliente(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      const usuarioId = getReqUsuarioId(req.user as UserToken)
      await ClienteService.excluirCliente(id, usuarioId);
      return reply.send({ menssage: "Cliente excluido com sucesso!" });
    } catch (err) {
      return reply
        .code(400)
        .send({ erro: "Erro ao excluir cliente.", detalhes: err });
    }
  },
  async listarClientes(req: FastifyRequest, reply: FastifyReply) {
    try {
      const usuarioId = getReqUsuarioId(req.user as UserToken)
      const clientes = await ClienteService.listarClientes(usuarioId);
      return reply.send(clientes);
    } catch (err) {
      return reply
        .code(500)
        .send({ erro: "Erro ao listar cliente.", detalhes: err });
    }
  },
  async buscarClienteId(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = String(req.params.id);
      const usuarioId = getReqUsuarioId(req.user as UserToken)
      const cliente = await ClienteService.buscarClienteId(id, usuarioId);
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
