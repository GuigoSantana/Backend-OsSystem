import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.services";

export const AuthController = {
  async criar(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { nome, email, cpf, telefone, senha } = req.body as any;
      const usuario = await AuthService.criar({
        nome,
        email,
        cpf,
        senha,
        telefone,
      });

      const token = await replay.jwtSign({
        sub: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      })

      return replay.code(201).send({ detalhes: "Usuário criado com sucesso!", token, usuarioId: usuario.id});
    } catch (err) {
      return replay
        .code(400)
        .send({ erro: "Erro ao criar usuário.", detalhes: err });
    }
  },
  async login(req: FastifyRequest, replay: FastifyReply) {
    try {
      const { email, senha } = req.body as any;
      if (!email || !senha){
        return replay.code(400).send({erro: "Email e senha são obrigatórios."})
      }
      const usuarioAuth = await AuthService.login({
        email,
        senha,
      });
      if(!usuarioAuth || usuarioAuth.senha !== senha){
        return replay.code(400).send({erro: "Credenciais inválidas."})
      }

      const token = await replay.jwtSign({
        sub: usuarioAuth.id,
        email: usuarioAuth.email,
        nome: usuarioAuth.nome,
      })

      return replay.code(200).send({detalhes: "Usuário logado com sucesso!", token, usuarioId: usuarioAuth.id})
    } catch (err) {
        console.log(err)
      return replay
        .code(400)
        .send({ erro: "Erro ao logar, verifique as credenciais.", detalhes: err });
    }
  },
  async auth(_: FastifyRequest, replay: FastifyReply){
      return replay.code(200).send({valid:true})
  } 
};
