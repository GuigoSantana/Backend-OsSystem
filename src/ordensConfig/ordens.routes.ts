import { FastifyInstance } from "fastify";
import { OrdemController } from "./ordens.controller";

export async function ordemRoutes(app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.post("/ordem", OrdemController.criar);
  app.get("/ordem", OrdemController.listar);
  app.put("/ordem", OrdemController.editar);
  app.delete("/ordem/:id", OrdemController.excluir);
}
