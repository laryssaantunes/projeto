const express = require('express');
const router = express.Router();

const AuthController = require("../controller/AuthController");
const MesaContoller = require("../controller/MesaController");

router.post('/novo', AuthController.verificaAutenticacao, AuthController.verificaPermissaoAdm, MesaContoller.novaMes);
router.get('/', MesaContoller.buscarMesas);
router.get('/disponibilidade', MesaContoller.mesasDisp)


module.exports = router;
