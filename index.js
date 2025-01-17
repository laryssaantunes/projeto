const prisma = require("./prisma/prismaClient");
const express = require("express");
const cors = require('cors');

const app = express();

const AuthController = require("./controller/AuthController");
const profileRoutes = require("./routes/ProfileRoutes");
const authRoutes = require("./routes/authRoutes");
const mesaRoutes = require("./routes/mesaRoutes");  
const reservaRoutes = require("./routes/reservaRoutes");  

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",  
        credentials: true
    })
);

app.use("/auth", authRoutes); 

app.use("/perfil", AuthController.autenticar, profileRoutes); 

app.use("/mesa", AuthController.autenticar, mesaRoutes); 

app.use("/reservas", AuthController.autenticar, reservaRoutes);  

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});
