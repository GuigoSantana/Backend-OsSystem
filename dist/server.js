"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const clientes_routes_1 = require("./clientesConfig/clientes.routes");
const produto_routes_1 = require("./produtosConfig/produto.routes");
const entradasaida_routes_1 = require("./entradaSaidaConfig/entradasaida.routes");
const ordens_routes_1 = require("./ordensConfig/ordens.routes");
const servico_routes_1 = require("./servicosConfig/servico.routes");
const auth_routes_1 = require("./authConfig/auth.routes");
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default);
// JWT Plugin 👇
app.register(jwt_1.default, {
    secret: "chave-super-secreta", // depois mova para variável de ambiente
    sign: {
        expiresIn: "30m"
    }
});
// Middleware global para autenticação
app.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        return reply.status(401).send({ erro: "Não autorizado.", err });
    }
});
const start = async () => {
    await app.register(auth_routes_1.authRoutes);
    await app.register(clientes_routes_1.clienteRoutes);
    await app.register(produto_routes_1.produtosRoutes);
    await app.register(servico_routes_1.servicoRoutes);
    await app.register(entradasaida_routes_1.entradaSaidaRoutes);
    await app.register(ordens_routes_1.ordemRoutes);
    try {
        await app.listen({ port: 3333 });
    }
    catch (error) {
        process.exit(1);
    }
};
start();
