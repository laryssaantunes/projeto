const express = require('express');
const router = express.Router();

const AuthController = require("../controller/AuthController");
const MesaController = require("../controller/MesaController");

router.post('/novo', AuthController.verificaAutenticacao, AuthController.verificaPermissaoAdm, MesaController.novaMesa);
router.get('/', MesaController.buscarMesas);
router.get('/disponibilidade', MesaController.mesasDisp);

module.exports = router;
