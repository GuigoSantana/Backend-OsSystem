"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicoController = void 0;
const servico_services_1 = require("./servico.services");
exports.servicoController = {
    async criar(req, replay) {
        try {
            const { title, preco, descricao, usuarioId } = req.body;
            const servico = await servico_services_1.servicoService.criar({ title, preco, descricao, usuarioId });
            return replay.code(201).send(servico);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ message: "Erro ao criar servicço.", detalhes: err });
        }
    },
    async editar(req, replay) {
        try {
            const { id, title, preco, descricao } = req.body;
            const servicoEditado = await servico_services_1.servicoService.editar(id, {
                title,
                preco,
                descricao,
            });
            return replay.code(200).send(servicoEditado);
        }
        catch (err) {
            return replay.code(400).send({ message: "Erro ao editar serviço.", detalhes: err });
        }
    },
    async listar(_, replay) {
        try {
            const servicos = await servico_services_1.servicoService.listar();
            return replay.code(200).send(servicos);
        }
        catch (err) {
            return replay.code(400).send({ message: "Erro ao listar serviços.", detalhes: err });
        }
    },
    async buscarId(req, replay) {
        try {
            const id = String(req.params.id);
            const servico = await servico_services_1.servicoService.buscarId(id);
            return replay.code(200).send(servico);
        }
        catch (err) {
            return replay.code(400).send({ message: "Erro ao buscar serviço." });
        }
    },
    async excluir(req, replay) {
        try {
            const id = String(req.params.id);
            await servico_services_1.servicoService.excluir(id);
            return replay.code(200).send({ message: "Serviço excluido com sucesso." });
        }
        catch (err) {
            return replay.code(400).send({ message: "Erro ao excluir serviço." });
        }
    },
};
