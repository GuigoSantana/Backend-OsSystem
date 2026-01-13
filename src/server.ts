import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { clienteRoutes } from "./clientesConfig/clientes.routes";
import { produtosRoutes } from "./produtosConfig/produto.routes";
import { entradaSaidaRoutes } from "./entradaSaidaConfig/entradasaida.routes";
import { ordemRoutes } from "./ordensConfig/ordens.routes";
import { servicoRoutes } from "./servicosConfig/servico.routes";
import { authRoutes } from "./authConfig/auth.routes";
const secret = process.env.SECRET_KEY;
const port = Number(process.env.PORT) || 3333;

const app = fastify({ logger: true });

// JWT Plugin
app.register(jwt, {
  secret: secret as string,
  sign: {
    expiresIn: "10m",
  },
});

// Middleware global para autenticação
app.decorate(
  "authenticate",
  async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.status(401).send({ erro: "Não autorizado.", err });
    }
  }
);

const start = async () => {
  await app.register(cors, {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
  await app.register(authRoutes);
  await app.register(clienteRoutes);
  await app.register(produtosRoutes);
  await app.register(servicoRoutes);
  await app.register(entradaSaidaRoutes);
  await app.register(ordemRoutes);
  try {
    await app.listen({ port, host: "0.0.0.0" });
  } catch (error) {
    process.exit(1);
  }
};

start();
