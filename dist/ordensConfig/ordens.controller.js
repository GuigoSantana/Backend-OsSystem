"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdemController = void 0;
const ordens_services_1 = require("./ordens.services");
exports.OrdemController = {
    async criar(req, replay) {
        try {
            const { clienteId, status, descricao, usuarioId, produtos, servicos } = req.body;
            const ordem = await ordens_services_1.OrdemService.criar({ clienteId, status, descricao, usuarioId });
            return replay.code(201).send(ordem);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ message: "Erro ao criar ordem.", detalhes: err });
        }
    },
    async listar(_, replay) {
        try {
            const ordens = await ordens_services_1.OrdemService.listar();
            return replay.code(201).send(ordens);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ message: "Erro ao listar ordem.", detalhes: err });
        }
    },
    async editar(req, replay) {
        try {
            const { id, status, descricao } = req.body;
            const ordem = await ordens_services_1.OrdemService.editar(id, { status, descricao });
            return replay.code(201).send(ordem);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ message: "Erro ao editar ordem.", detalhes: err });
        }
    },
    async excluir(req, replay) {
        try {
            const id = String(req.params.id);
            const ordem = await ordens_services_1.OrdemService.excluir(id);
            return replay.send("Ordem excluida com sucesso.");
        }
        catch (err) {
            return replay
                .code(400)
                .send({ message: "Erro ao editar ordem.", detalhes: err });
        }
    },
};
