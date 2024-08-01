const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const getAllUsers = async (request, response) => {
    const usuario = await prisma.usuarios.findMany();
    response.status(200).json(usuario)
}

const createUser = async (request, response) => {
    const { nome, email, senha, reputacao } = request.body;
    const usuario = await prisma.usuarios.create({
        data: { nome, email, senha, reputacao }
    })
    response.status(201).json(usuario)
}

const updateUser = async (request, response) => {
    const { nome, email, senha, reputacao } = request.body;
    const { id } = request.params;

    // Converte o ID da rota para um número inteiro para garantir a comparação correta com o campo 'id' da tabela 'usuario'
    const id_usuario = parseInt(id)

    const usuario = await prisma.usuarios.findFirst({
        where: { id: id_usuario }
    })

    if(usuario){
        const usuario = await prisma.usuarios.update({
            data: { nome, email, senha, reputacao },
            where: { id: id_usuario }
        })
        response.status(200).json(usuario)
    } else {
        response.status(404).json("Usuário não encontrado")
    }
}

const deleteUser = async (request, response) => {
    const { id } = request.params;

    const id_usuario = parseInt(id)

    const usuario = await prisma.usuarios.findFirst({
        where: { id: id_usuario }
    })

    if(usuario){
        await prisma.usuarios.delete({
            where: { id: id_usuario }
        })
        response.status(204).send()
    } else {
        response.status(404).json("Usuario não encontrado")
    }
}

module.exports ={
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}