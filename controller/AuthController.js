const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController{
    static async cadastro(req, res) {
        const{nome, email, password} = req.boby;

        if (nome || nome.length < 6) {
            return res.statutus(422).json({
                erro: true,
            mernsagem: "O nome deve ter pelo menos 6 caracteres",
            });
        }

        if (!email || email.length < 10) {
            return res.json({
                erro: true,
            mernsagem: "O email deve ter pelo menos 10 caracteres",
            });
        }
        if (!password || password.length < 8) {
            return res.json({
                erro: true,
            mernsagem: "A password deve ter pelo menos 10 caracteres",
            });
        }

            const existe = await prisma.usuario.count({
                where: {
                    email: email
                },
            });

            if(existe != 0){
                return res.json({
                    erro: true,
                    mensagem: "Já existe um usuário cadastrado com este e-mail",
                })
            }

            const salt = bcryptjs.genSaltSync(8);
            const hashpassword = bcryptjs(password, salt);

            try{
            await prisma.usuario.create({
                data: {
                    nome: nome,
                    email: email,
                    password: hashpassword,
                    tipo: "cliente",
                },
            });

            return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
            });
        } catch (error) {
            return res.json({
            erro: true,
            mensagem: "Ocorreu um erro, tente novamente mais tarde!" + error,
            });
        }        
    }


    static async login {
        const {email, password} = req.body;

        const usuario = await prisma.usuario.findUnique({
            where:{
                email: email
            }
        });

        if(!usuario){
            return res.json({
                erro: true,
                mensagem: "usuário não encontrado",
            });
        }

        //Verificação da senha
        const senhaCorreta = bcryptjs.compareSync(password, usuario.password);
        if(!senhaCorreta){
            return res.json({
                erro: true,
                mensagem: "Senha incorreta.",
            });
        }
        const token = jwt.sign({id: usuario.id}, process.env.secret-key, {
            expiresIn: "1h",
        });
        res.json({
            erro: false,
            mensagem: "Autenticação realizada com sucesso!"
        })
    }
}
module.exports = AuthController;