const prisma = require("../prisma/prismaClient");

class ProfileController {
    static async getPerfil(req, res) {
        const usuarioId = req.usuarioId; 

        try {
            const usuario = await prisma.usuario.findUnique({
                where: {
                    id: usuarioId,
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    tipo: true, 
                },
            });

            if (!usuario) {
                return res.status(404).json({
                    erro: true,
                    mensagem: "Usuário não encontrado",
                });
            }

            return res.status(200).json({
                erro: false,
                mensagem: "Perfil obtido com sucesso",
                usuario,
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro ao buscar os dados do perfil. Tente novamente mais tarde.",
            });
        }
    }

    static async atualizarPerfil(req, res) {
        const usuarioId = req.usuarioId; 
        const { nome, email, password } = req.body;

        if (!nome && !email && !password) {
            return res.status(422).json({
                erro: true,
                mensagem: "Por favor, forneça ao menos um campo para atualização.",
            });
        }

        if (nome && nome.length < 6) {
            return res.status(422).json({
                erro: true,
                mensagem: "O nome deve ter pelo menos 6 caracteres",
            });
        }

        if (email && email.length < 10) {
            return res.status(422).json({
                erro: true,
                mensagem: "O email deve ter pelo menos 10 caracteres",
            });
        }

        if (password && password.length < 8) {
            return res.status(422).json({
                erro: true,
                mensagem: "A senha deve ter pelo menos 8 caracteres",
            });
        }

        try {
            const usuario = await prisma.usuario.findUnique({
                where: {
                    id: usuarioId,
                },
            });

            if (!usuario) {
                return res.status(404).json({
                    erro: true,
                    mensagem: "Usuário não encontrado",
                });
            }

            const updatedData = {};
            if (nome) updatedData.nome = nome;
            if (email) updatedData.email = email;
            if (password) {
                const salt = bcryptjs.genSaltSync(8);
                const hashpassword = bcryptjs.hashSync(password, salt);
                updatedData.password = hashpassword;
            }

            const usuarioAtualizado = await prisma.usuario.update({
                where: {
                    id: usuarioId,
                },
                data: updatedData,
            });

            return res.status(200).json({
                erro: false,
                mensagem: "Perfil atualizado com sucesso!",
                usuario: usuarioAtualizado,
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro ao atualizar o perfil. Tente novamente mais tarde.",
            });
        }
    }
}

module.exports = ProfileController;
