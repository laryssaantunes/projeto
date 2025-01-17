const express = require("express");
const router = express.Router();

const ProfileController = require("../controller/ProfileController");
const AuthController = require("../controller/AuthController");
router.get("/perfil", AuthController.verificaAutenticacao, ProfileController.getPerfil);
router.patch("/perfil", AuthController.verificaAutenticacao, ProfileController.atualizarPerfil);

//quero pegar o perfil, então vou usar GET
//quero atualizar o perfil então vou usar PUT ou PATCH dependendo  

// post e get
// put, patch, delete
//put substituir por inteiro 
//patch atualizar alguns dados
module.exports = router;

