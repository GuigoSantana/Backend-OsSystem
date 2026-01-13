// src/routes/cliente.routes.ts
import { FastifyInstance } from "fastify";
import { ProdutoController } from "./produto.controller";

export async function produtosRoutes(app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.get("/produtos", ProdutoController.listarProdutos);
  app.post("/produtos", ProdutoController.criarProduto);
  app.put("/produtos/:id", ProdutoController.editarProduto);
  app.get("/produto/:id", ProdutoController.buscarProdutoId);
  app.delete("/produtos/:id", ProdutoController.excluirProduto);
}
