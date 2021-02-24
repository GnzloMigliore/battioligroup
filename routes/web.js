const express = require('express');
const router = express.Router();
const path = require('path');




const controllersWeb = require(path.resolve(__dirname, '..', 'controllers', 'controllersWeb'));
//armo mis rutas

router.get('/', controllersWeb.index);
router.get('/nosotros', controllersWeb.nosotros);
router.get('/servicios', controllersWeb.servicios);
router.get('/contacto', controllersWeb.contacto);
module.exports = router;
