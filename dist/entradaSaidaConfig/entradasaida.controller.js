"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntradaSaidaController = void 0;
const entradasaida_services_1 = require("./entradasaida.services");
exports.EntradaSaidaController = {
    async criarEntrada(req, replay) {
        try {
            const { title, preco, usuarioId } = req.body;
            const entrada = await entradasaida_services_1.EntradaSaidaService.criarEntrada({
                title,
                preco,
                usuarioId
            });
            return replay.code(201).send(entrada);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao criar entrada.", detalhes: err });
        }
    },
    async excluirEntrada(req, replay) {
        try {
            const id = String(req.params.id);
            await entradasaida_services_1.EntradaSaidaService.excluirEntrada(id);
            return replay.send({ menssage: "Entrada excluida com sucesso!" });
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao excluir entrada.", detalhes: err });
        }
    },
    async listarEntradas(_, replay) {
        try {
            const entradas = await entradasaida_services_1.EntradaSaidaService.listarEntradas();
            return replay.send(entradas);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ menssage: "Erro ao listar entradas.", detalhes: err });
        }
    },
    async criarSaida(req, replay) {
        try {
            const { title, preco, usuarioId } = req.body;
            const saida = await entradasaida_services_1.EntradaSaidaService.criarSaida({
                title,
                preco,
                usuarioId
            });
            return replay.code(201).send(saida);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao criar saida.", detalhes: err });
        }
    },
    async excluirSaida(req, replay) {
        try {
            const id = String(req.params.id);
            await entradasaida_services_1.EntradaSaidaService.excluirSaida(id);
            return replay.send({ menssage: "Saida excluida com sucesso!" });
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao excluir saida.", detalhes: err });
        }
    },
    async listarSaidas(_, replay) {
        try {
            const saidas = await entradasaida_services_1.EntradaSaidaService.listarSaidas();
            return replay.send(saidas);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ menssage: "Erro ao listar saidas.", detalhes: err });
        }
    },
};
