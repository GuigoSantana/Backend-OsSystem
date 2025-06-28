import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const AuthService = {
    async criar(data: {
        nome: string;
        cpf: string;
        email: string;
        senha: string;
        telefone: string;
        
    }) {
        return await prisma.usuario.create({ data })
    },
    async login(data:{
        email: string;
        telefone?: string;
        senha: string;
    }) {
        return await prisma.usuario.findUnique({where: {email: data.email}})
    }
}