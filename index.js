const prisma = require("./prisma/prismaClient");
const express = require("express");
const cors = require("cors");

const AuthController = require("./controller/AuthController")

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const profileRoutes = require("./routes/ProfileRoutes"); 
app.use("/perfil", AuthController.verificaAutenticacao, profileRoutes);

const mesaRoutes = require("./routes/mesaRoutes"); 
app.use("/mesa", mesaRoutes); 

const reservaRoutes = require("./routes/reservaRoutes"); 
app.use("/reserva", AuthController.verificaAutenticacao, reservaRoutes)

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});