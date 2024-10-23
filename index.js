const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const express = require ("express");

const app = express();
app.use(express.json());

// Responde a qualquer requisição encaminhada para 
// /auth/algumaCoisa
const authRoutes = require("./routes/authRoutes");
app.use("/auth",authRoutes );

app.listen(8000);