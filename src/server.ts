import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { clienteRoutes } from "./clientesConfig/clientes.routes";
import { produtosRoutes } from "./produtosConfig/produto.routes";
import { entradaSaidaRoutes } from "./entradaSaidaConfig/entradasaida.routes";
import { ordemRoutes } from "./ordensConfig/ordens.routes";
import { servicoRoutes } from "./servicosConfig/servico.routes";
import { authRoutes } from "./authConfig/auth.routes";

const app = fastify({ logger: true });
app.register(cors);

// JWT Plugin 👇
app.register(jwt, {
  secret: "chave-super-secreta", // depois mova para variável de ambiente
  sign: {
    expiresIn: "30m"
  }
});

// Middleware global para autenticação
app.decorate("authenticate", async function (request: any, reply: any) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ erro: "Não autorizado.", err });
  }
});

const start = async () => {
  await app.register(authRoutes);
  await app.register(clienteRoutes);
  await app.register(produtosRoutes);
  await app.register(servicoRoutes);
  await app.register(entradaSaidaRoutes);
  await app.register(ordemRoutes);
  try {
    await app.listen({ port: 3333 });
  } catch (error) {
    process.exit(1);
  }
};

start();
