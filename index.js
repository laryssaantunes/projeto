const prisma = require("./prisma/prismaClient");
const express = require("express");
const cors = require('cors');

const AuthController = require("./controller/AuthController");

const profileRoutes = require("./routes/ProfileRoutes");
const authRoutes = require("./routes/authRoutes");
const mesaRoutes = require("./routes/mesaRoutes");  
const reservaRoutes = require("./routes/reservaRoutes");  

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",  
        credentials: true
    })
);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes); 

const profileRoutes = require ("./routes.profileRoutes");
app.use("/perfil", AuthController.autenticar, profileRoutes); 

const mesaRoutes = require ("./routes.mesaRoutes")
app.use("/mesa", mesaRoutes); 

const reservaRoutes = require ("./routes.reservaRoutes")
app.use("/reservas", AuthController.autenticar, reservaRoutes);  

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});
