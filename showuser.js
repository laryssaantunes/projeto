const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function main()
    {
        const usuario = await prisma.usuario.flindMany();

        console.log(JSON.stringify(usuario, null, 4));
    }
main();

[

]
