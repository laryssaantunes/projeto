const prisma = require("./prisma/prismaClient");
const express = require ("express");
const cors = require('cors')
const app = express();

app.use(express.json());
app.(cors([
    origin: "http://localhost:3000",
    credentials: true
]))

app.use(express.json());
// Responde a qualquer requisição encaminhada para 
// /auth/algumaCoisa
const authRoutes = require("./routes/authRoutes");
app.use("/auth",authRoutes );

app.listen(8000);