"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoController = void 0;
const produto_services_1 = require("./produto.services");
exports.ProdutoController = {
    async criar(req, replay) {
        try {
            const { title, precoc, precov, descricao, estoque, usuarioId } = req.body;
            const cliente = await produto_services_1.ProdutoService.criarProduto({
                title,
                precov,
                precoc,
                descricao,
                estoque,
                usuarioId,
            });
            return replay.code(201).send(cliente);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao criar produto.", detalhes: err });
        }
    },
    async editar(req, replay) {
        try {
            const { id, title, precov, precoc, descricao, estoque } = req.body;
            const produtoEditado = await produto_services_1.ProdutoService.editarProduto(id, {
                title,
                precoc,
                precov,
                descricao,
                estoque,
            });
            return replay.send(produtoEditado);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao editar produto.", detalhes: err });
        }
    },
    async excluir(req, replay) {
        try {
            const id = String(req.params.id);
            await produto_services_1.ProdutoService.excluirProduto(id);
            return replay.send({ menssage: "Produto excluido com sucesso!" });
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao excluir produto.", detalhes: err });
        }
    },
    async listar(_, replay) {
        try {
            const produtos = await produto_services_1.ProdutoService.listarProdutos();
            return replay.send(produtos);
        }
        catch (err) {
            return replay
                .code(500)
                .send({ erro: "Erro ao listar produtos.", detalhes: err });
        }
    },
    async buscarId(req, replay) {
        try {
            const id = String(req.params.id);
            const cliente = await produto_services_1.ProdutoService.buscarPorId(id);
            if (!cliente)
                return replay.code(404).send({ erro: "Produto não encontrado." });
            return replay.send(cliente);
        }
        catch (err) {
            return replay
                .code(400)
                .send({ erro: "Erro ao buscar produtos.", detalhes: err });
        }
    },
};
