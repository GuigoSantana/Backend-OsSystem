"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const auth_controller_1 = require("./auth.controller");
async function authRoutes(app) {
    app.post("/usuario", auth_controller_1.AuthController.criar);
    app.post("/usuario/login", auth_controller_1.AuthController.login);
}
