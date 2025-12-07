import { FastifyInstance } from "fastify";
import { servicoController } from "./servico.controller";

export async function servicoRoutes(app: FastifyInstance){
    app.addHook("onRequest", app.authenticate);
    app.post('/servicos', servicoController.criar)
    app.get('/servicos', servicoController.listar)
    app.put('/servicos', servicoController.editar)
    app.delete('/servicos/:id', servicoController.excluir)
    app.get('/servicos/:id', servicoController.buscarId)
}