"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entradaSaidaRoutes = entradaSaidaRoutes;
const entradasaida_controller_1 = require("./entradasaida.controller");
async function entradaSaidaRoutes(app) {
    app.get("/entradas", entradasaida_controller_1.EntradaSaidaController.listarEntradas);
    app.post("/entradas", entradasaida_controller_1.EntradaSaidaController.criarEntrada);
    app.delete("/entradas/:id", entradasaida_controller_1.EntradaSaidaController.excluirEntrada);
    app.get("/saidas", entradasaida_controller_1.EntradaSaidaController.listarSaidas);
    app.post("/saidas", entradasaida_controller_1.EntradaSaidaController.criarSaida);
    app.delete("/saidas/:id?", entradasaida_controller_1.EntradaSaidaController.excluirSaida);
}
