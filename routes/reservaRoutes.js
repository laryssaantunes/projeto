const express = require('express');
const { reservarMesa, listarReservas } = require('../controllers/reservaController');
const autenticar = require('../middlewares/autenticar');

const router = express.Router();

router.post('/novo', autenticar, reservarMesa);
router.get('/', autenticar, listarReservas);

module.exports = router;
