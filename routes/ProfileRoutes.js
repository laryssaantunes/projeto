const express = require("express");
const router = express.Router();

const ProfileController = require("../controller/ProfileController");
const AuthController = require("../controller/AuthController");
router.get("/perfil", AuthController.verificaAutenticacao, ProfileController.getPerfil);
router.put("/perfil", AuthController.verificaAutenticacao, ProfileController.atualizarPerfil);
module.exports = router;
