const express = require('express');
const { cadastrarMesa, listarMesas } = require('../controllers/mesaController');
const autenticar = require('../middlewares/autenticar');
const autorizacaoAdm = require('../middlewares/autorizacaoAdm');

const router = express.Router();

router.post('/novo', autenticar, autorizacaoAdm, cadastrarMesa);
router.get('/', listarMesas);

module.exports = router;
