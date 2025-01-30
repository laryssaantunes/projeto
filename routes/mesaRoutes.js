const express = require("express");
const router = express.Router();
const MesaController = require("../controller/MesaController");
const AuthController = require("../controller/AuthController")
router.post("/novo", 
    AuthController.verificaAutenticacao, 
    AuthController.verificaPermissaoAdm, 
    MesaController.novaMesa);
router.get("/", MesaController.buscarMesas);
router.get("/disponibilidade", MesaController.mesasDisp);
module.exports = router;