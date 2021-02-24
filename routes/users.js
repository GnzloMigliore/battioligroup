const express = require('express');
const router = express.Router();
const path = require('path');




const controllersUsers = require(path.resolve(__dirname, '..', 'controllers', 'controllersUsers'));
//armo mis rutas

router.get('/login', controllersUsers.index);
router.get('/createuser', controllersUsers.create);
router.post('/registro', controllersUsers.registro);


module.exports = router;