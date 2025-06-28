"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_services_1 = require("./auth.services");
exports.AuthController = {
    async criar(req, replay) {
        try {
            const { nome, email, cpf, telefone, senha } = req.body;
            const usuario = await auth_services_1.AuthService.criar({
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
            });
            return replay.code(201).send({ detalhes: "Usuário criado com sucesso!", token });
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao criar usuário.", detalhes: err });
        }
    },
    async login(req, replay) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return replay.code(400).send({ erro: "Email e senha são obrigatórios." });
            }
            const usuarioAuth = await auth_services_1.AuthService.login({
                email,
                senha,
            });
            if (!usuarioAuth || usuarioAuth.senha !== senha) {
                return replay.code(400).send({ erro: "Credenciais inválidas." });
            }
            const token = await replay.jwtSign({
                sub: usuarioAuth.id,
                email: usuarioAuth.email,
                nome: usuarioAuth.nome,
            });
            return replay.code(200).send({ detalhes: "Usuário logado com sucesso!", token });
        }
        catch (err) {
            console.log(err);
            return replay
                .code(400)
                .send({ erro: "Erro ao logar, verifique as credenciais.", detalhes: err });
        }
    },
    async auth(_, replay) {
        return replay.code(200).send({ valid: true });
    }
};
