"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteRoutes = clienteRoutes;
const cliente_controller_1 = require("./cliente.controller");
async function clienteRoutes(app) {
    app.post("/clientes", cliente_controller_1.ClienteController.criar);
    app.get("/clientes", cliente_controller_1.ClienteController.listar);
    app.put("/clientes", cliente_controller_1.ClienteController.editar);
    app.get("/clientes/:id", cliente_controller_1.ClienteController.buscarId);
    app.delete("/clientes/:id", cliente_controller_1.ClienteController.excluir);
}
