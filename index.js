const prisma = require("./prisma/prismaClient");
const express = require("express");
const cors = require('cors');
const app = express();
const AuthController = require("./controller/AuthController");
const profileRoutes = require("./routes/ProfileRoutes"); 
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000", 
        credentials: true
    })
);

app.use(express.json());
app.use("/auth", authRoutes); 
app.use("/perfil", AuthController.verificaAutenticacao, profileRoutes);  
app.get("/privado", AuthController.verificaAutenticacao, (req, res) => {
    res.json({
        msg: "Você acessou uma rota restrita!"
    });
});
app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});
