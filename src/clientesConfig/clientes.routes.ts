// src/routes/cliente.routes.ts
import { FastifyInstance } from "fastify";
import { ClienteController } from "./cliente.controller";

export async function clienteRoutes(app: FastifyInstance) {
  app.post("/clientes", ClienteController.criar);
  app.get("/clientes/:id", ClienteController.listar);
  app.put("/clientes", ClienteController.editar);
  app.get("/clientes/:id", ClienteController.buscarId);
  app.delete("/clientes/:id", ClienteController.excluir);
}
