// src/routes/cliente.routes.ts
import { FastifyInstance } from "fastify";
import { ProdutoController } from "./produto.controller";

export async function produtosRoutes(app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.post("/produtos", ProdutoController.criar);
  app.get("/produtos/:id", ProdutoController.listar);
  app.put("/produtos/:id", ProdutoController.editar);
  app.get("/produto/:id", ProdutoController.buscarId);
  app.delete("/produtos/:id", ProdutoController.excluir);
}
