const express = require("express");
const router = express.Router();

const ProfileController = require("../controller/ProfileController");
const AuthController = require("../controller/AuthController");

router.get("/perfil", AuthController.verificaAutenticacao, ProfileController.getPerfil);
router.patch("/perfil", AuthController.verificaAutenticacao, ProfileController.atualizarPerfil);
router.get("/todos", AuthController.verificaAutenticacao, AuthController.verificaPermissaoAdm, ProfileController.buscarUsuarios);
module.exports = router;

