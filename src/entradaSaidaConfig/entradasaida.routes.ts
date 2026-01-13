import { FastifyInstance } from "fastify";
import { EntradaSaidaController } from "./entradasaida.controller";

export async function entradaSaidaRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);
  app.get("/entradas", EntradaSaidaController.listarEntradas);
  app.post("/entradas", EntradaSaidaController.criarEntrada);
  app.delete("/entradas/:id", EntradaSaidaController.excluirEntrada);

  app.get("/saidas", EntradaSaidaController.listarSaidas);
  app.post("/saidas", EntradaSaidaController.criarSaida);
  app.delete("/saidas/:id?", EntradaSaidaController.excluirSaida);
}
