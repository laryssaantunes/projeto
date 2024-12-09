const prisma = require("./prisma/prismaClient");
const express = require ("express");
const cors = require('cors')
const app = express();
const AuthController = require("./controller/AuthController");

app.use(express.json());

app.use(
    cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json());
// Responde a qualquer requisição encaminhada para 
// /auth/algumaCoisa
const authRoutes = require("./routes/authRoutes");
const AuthController = require("./controller/AuthController");
app.use("/auth",authRoutes );
// Apenas um exemplo que o professor passou no videio aula 10.
app.use("/perfil", AuthController.verificaAutenticacao, perfiçRoutes);

app.get("/privado", AuthController.verificaAutenticacao, (req, res)=>
{
    res.json(
        {
            msg: "Você acessou uma rota restrita!"
        }
    );
});

app.listen(8000);