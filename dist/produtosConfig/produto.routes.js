"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtosRoutes = produtosRoutes;
const produto_controller_1 = require("./produto.controller");
async function produtosRoutes(app) {
    app.post('/produtos', produto_controller_1.ProdutoController.criar);
    app.get('/produtos', produto_controller_1.ProdutoController.listar);
    app.put('/produtos', produto_controller_1.ProdutoController.editar);
    app.get('/produtos/:id', produto_controller_1.ProdutoController.buscarId);
    app.delete('/produtos/:id', produto_controller_1.ProdutoController.excluir);
}
