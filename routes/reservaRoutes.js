const express = require("express");
const router = express.Router();
const ReservaController = require("../controller/ReservaController");
const AuthController = require("../controller/AuthController");
router.post("/novo", AuthController.verificaAutenticacao, ReservaController.registrarReserva);
router.get("/", AuthController.verificaAutenticacao, ReservaController.minhasReservas);
router.delete("/", AuthController.verificaAutenticacao, ReservaController.cancelarReserva);
router.get("/list", 
    AuthController.verificaAutenticacao, 
    AuthController.verificaPermissaoAdm, 
    ReservaController.buscarReservasPorData
);
module.exports = router;