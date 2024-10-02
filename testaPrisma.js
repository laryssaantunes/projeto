const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function main(){
    //Insere um usuário
    const novoUsuario = await prisma.usuario.create({
        data:{
        nome: "josé Bonifácio",
        email: "jose.bonifacio@imperioptbr.com",
        },
    });

    console.log("Novo usuário:" + JSON.stringify (novoUsuario));

    //Busca usuário
    const usuarios = await prisma.usuario.findMany() ;
    console.log("Todos os usuário:" + JSON.stringify (usuarios));
}

main().catch((erro) => {
    console.log("Erro:" + erro);
});