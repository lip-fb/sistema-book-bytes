const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

const login = async (request, response) => {
    try {
        const { email, senha } = request.body

        const usuario = await prisma.usuarios.findFirst({ where: { email } })

        if (!usuario) {
            return response.status(401).json({ error: "Unauthorized" })
        }

        const valid = bcrypt.compareSync(senha, usuario.senha)

        if (!valid) {
            return response.status(401).json({ error: "Unauthorized" })
        }

        const token = jwt.sign({ usuario: usuario.nome }, process.env.SECRET_JWT, { expiresIn: '1d' })

        return response.status(200).json({ id: usuario.id, usuario: usuario.nome, token: token })

    } catch (error) {
        return response.status(500).json({ error: "Error" })
    }
}

module.exports = { login }
