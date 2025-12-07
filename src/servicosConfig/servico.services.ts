import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const servicoService = {
    async criar(data: {
        nome: string;
        preco: number;
        descricao: string;
        usuarioId: string;
    }) {
        return await prisma.servico.create({data})
    },
    async editar(id: string, data: {
        nome?: string;
        preco?: number;
        descricao: string;
    }) {
        return await prisma.servico.update({where: {id}, data})
    },
    async listar(){
        return await prisma.servico.findMany()
    },
    async buscarId(id:string){
        return await prisma.servico.findUnique({where: {id}})
    },
    async excluir(id: string){
        return await prisma.servico.delete({where: {id}})
    },
}