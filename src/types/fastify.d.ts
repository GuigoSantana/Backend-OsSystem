import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any; // ou: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
