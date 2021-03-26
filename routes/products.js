const express = require('express');
const router = express.Router();
const path = require('path');




const controllersproducts = require(path.resolve(__dirname, '..', 'controllers', 'controllersProducts'));
//armo mis rutas

router.get('/miscompras/:id', controllersproducts.index);

module.exports = router;
