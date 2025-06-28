"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicoRoutes = servicoRoutes;
const servico_controller_1 = require("./servico.controller");
async function servicoRoutes(app) {
    app.post('/servicos', servico_controller_1.servicoController.criar);
    app.get('/servicos', servico_controller_1.servicoController.listar);
    app.put('/servicos', servico_controller_1.servicoController.editar);
    app.delete('/servicos/:id', servico_controller_1.servicoController.excluir);
    app.get('/servicos/:id', servico_controller_1.servicoController.buscarId);
}
