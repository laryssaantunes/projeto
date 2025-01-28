const express = require('express');
const router = express.Router();

const ReservaController = require("../controllers/ReservaController");
const AuthController = require('../controllers/AuthComtroller');

router.post('/novo', ReservaController.registrarReserva);
router.get('/', autenticar, listarReservas);
router.delete("/", AuthController.verificaAutenticacao, ReservaController.minhasReserva);
router.get("/list", AuthController.verificaAutenticacao, AuthController.verificaPermissaoAdm, ReservaController.buscarReservasPorData);

module.exports = router;
