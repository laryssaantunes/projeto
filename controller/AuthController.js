const prisma = require("../prisma/prismaClient");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController{
    static async cadastro(req, res) {
        const{nome, email, password} = req.body;
        console.log("cadastro")
        //Verificando os dados
        if (!nome || nome.length < 6) {
            return res.status(422).json({
                erro: true,
                mensagem: "O nome deve ter pelo menos 6 caracteres",
            });
        }
        if (!email || email.length < 10) {
            return res.status(422).json({
                erro: true,
                mensagem: "O email deve ter pelo menos 10 caracteres",
            });
        }
        if (!password || password.length < 8) {
            return res.status(422).json({
                erro: true,
                mensagem: "A password deve ter pelo menos 10 caracteres",
            });
        }

        const existe = await prisma.usuario.count({
            where: {
                email: email
                },
            });

            // Verificando se o e-mail está cadastrado
            if(existe != 0){
                return res.status(422).json({
                    erro: true,
                    mensagem: "Já existe um usuário cadastrado com este e-mail",
                })
            }

            // Criando o úsuario no banco de dados
            const salt = bcryptjs.genSaltSync(8);
            const hashpassword = bcryptjs.hashSync(password, salt);

            try{
                const usuario = await prisma.usuario.create({
                    data: {
                      nome: nome,
                      email: email,
                      password: hashpassword,
                      tipo: "cliente",
                    },
            });

            // Criando o token JWT
            const token = jwt.sign({id: usuario.id}, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            return res.status(201).json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!",
            token,
            });
        } catch (error) {
            return res.status(500).json({
            erro: true,
            mensagem: "Ocorreu um erro, tente novamente mais tarde!" + error,
            });
        }        
    }


    static async login(req, res) {
        const {email, password} = req.body;

        // Verificando se o úsuario existe
        const usuario = await prisma.usuario.findFirst({
            where:{
                email: email
            }
        });

        if(!usuario){
            return res.status(422).json({
                erro: true,
                mensagem: "usuário não encontrado",
            });
        }

        //Verificação da senha
        const senhaCorreta = bcryptjs.compareSync(password, usuario.password);
        if(!senhaCorreta){
            return res.status(422).json({
                erro: true,
                mensagem: "Senha incorreta.",
            });
        }

        //Gera o token 
        const token = jwt.sign({id: usuario.id}, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).json({
            erro: false,
            mensagem: "Autenticação realizada com sucesso!",
            token, // Retornando o token para o fronend
        });
    }

    static async verificaAutenticacao(req, res, next){
        const authHeader = req.headers["authorization"];

        const token = authHeader && authHeader.split("")[1];

        if(!token){
            return res.status(422).json({message: "Token não encontrado"});
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, payload)=>{
            if(err){
            return res.status(401).json({msg: "Token Inválido!"});
            }
             req.usuarioId = payload.id;
             next();
        });
    }
}
module.exports = AuthController;