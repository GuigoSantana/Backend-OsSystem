// src/routes/cliente.routes.ts
import { FastifyInstance } from "fastify";
import { ClienteController } from "./cliente.controller";

export async function clienteRoutes(app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.post("/clientes", ClienteController.criarCliente);
  app.get("/clientes", ClienteController.listarClientes);
  app.put("/clientes/:id", ClienteController.editarCliente);
  app.get("/cliente/:id", ClienteController.buscarClienteId);
  app.delete("/clientes/:id", ClienteController.excluirCliente);
}
