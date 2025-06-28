"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const cliente_services_1 = require("./cliente.services");
exports.ClienteController = {
    async criar(req, replay) {
        try {
            const { nome, email, cpf, telefone, endereco, usuarioId } = req.body;
            const cliente = await cliente_services_1.ClienteService.criar({
                nome,
                email,
                cpf,
                telefone,
                endereco,
                usuarioId,
            });
            return replay.code(201).send(cliente);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao criar cliente.", detalhes: err });
        }
    },
    async editar(req, replay) {
        try {
            const { id, nome, email, cpf, telefone, endereco } = req.body;
            const clienteEditado = await cliente_services_1.ClienteService.editar(id, {
                nome,
                email,
                endereco,
                cpf,
                telefone,
            });
            return replay.send(clienteEditado);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao editar cliente.", detalhes: err });
        }
    },
    async excluir(req, replay) {
        try {
            const id = String(req.params.id);
            await cliente_services_1.ClienteService.excluir(id);
            return replay.send({ menssage: "Cliente excluido com sucesso!" });
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao excluir cliente.", detalhes: err });
        }
    },
    async listar(_, replay) {
        try {
            const clientes = await cliente_services_1.ClienteService.listar();
            return replay.send(clientes);
        }
        catch (err) {
            return replay
                .code(500)
                .send({ erro: "Erro ao listar cliente.", detalhes: err });
        }
    },
    async buscarId(req, replay) {
        try {
            const id = String(req.params.id);
            const cliente = await cliente_services_1.ClienteService.buscarId(id);
            if (!cliente)
                return replay.code(404).send({ erro: "Cliente não encontrado." });
            return replay.send(cliente);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao buscar cliente.", detalhes: err });
        }
    },
};
