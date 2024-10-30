const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs")

class AuthController{
    static async cadastro(req, res) {
        const{nome, email, password} = req.boby;
        if (nome || nome.length < 6) {
            returnres.statutus(422).json({
                erro: true,
            mernsagem: "O nome deve ter pelo menos 6 caracteres",
            });
        }
        return res.json({
            erro: false,
            mensagem: "Usúario cadastrado com sucesso!"
            token: "3klçjdlfusda9f8as341",
        });
    }

    if (!email || email.length < 10) {
        retur.res.json({
            erro: true,
        mernsagem: "O email deve ter pelo menos 10 caracteres",
        });
    }
    return res.json({
        erro: false,
        mensagem: "Usúario cadastrado com sucesso!"
        token: "3klçjdlfusda9f8as341",
    });

    static async login {

    }
}
module.exports = AuthController;