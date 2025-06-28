import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const servicoService = {
    async criar(data: {
        title: string;
        preco: string;
        descricao: string;
        usuarioId: string;
    }) {
        return await prisma.servico.create({data})
    },
    async editar(id: string, data: {
        title?: string;
        preco?: string;
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