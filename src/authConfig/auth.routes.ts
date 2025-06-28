import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/usuario", AuthController.criar);
  app.post("/usuario/login", AuthController.login);
  app.get("/usuario/auth", {preHandler: [app.authenticate]}, AuthController.auth)
}
