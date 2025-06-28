// src/routes/cliente.routes.ts
import { FastifyInstance } from 'fastify'
import { ProdutoController } from './produto.controller'

export async function produtosRoutes(app: FastifyInstance) {
  app.post('/produtos', ProdutoController.criar)
  app.get('/produtos', ProdutoController.listar)
  app.put('/produtos', ProdutoController.editar)
  app.get('/produtos/:id', ProdutoController.buscarId)
  app.delete('/produtos/:id', ProdutoController.excluir)
}