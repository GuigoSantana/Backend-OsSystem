// src/routes/cliente.routes.ts
import { FastifyInstance } from "fastify";
import { ClienteController } from "./cliente.controller";

export async function clienteRoutes(app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.post("/clientes", ClienteController.criar);
  app.get("/clientes", ClienteController.listar);
  app.put("/clientes", ClienteController.editar);
  app.get("/clientes/:id", ClienteController.buscarId);
  app.delete("/clientes/:id", ClienteController.excluir);
}
