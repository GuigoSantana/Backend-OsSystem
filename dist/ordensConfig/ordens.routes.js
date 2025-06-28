"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordemRoutes = ordemRoutes;
const ordens_controller_1 = require("./ordens.controller");
async function ordemRoutes(app) {
    app.post("/ordem", ordens_controller_1.OrdemController.criar);
    app.get("/ordem", ordens_controller_1.OrdemController.listar);
    app.put("/ordem", ordens_controller_1.OrdemController.editar);
    app.delete("/ordem/:id", ordens_controller_1.OrdemController.excluir);
}
