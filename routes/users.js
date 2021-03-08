const express = require('express');
const router = express.Router();
const path = require('path');
const {
    check,
    validationResult,
    body
  } = require('express-validator');


const validacionAcceso = require(path.resolve(__dirname, '..', 'middlewares', 'validacionAcceso'));
const controllersUsers = require(path.resolve(__dirname, '..', 'controllers', 'controllersUsers'));
//armo mis rutas

router.get('/login', controllersUsers.index);
router.post('/session',[validacionAcceso], controllersUsers.login);
router.get('/logout',[validacionAcceso], controllersUsers.logout);
router.get('/createuser', controllersUsers.create);
router.post('/registro', controllersUsers.registro);


module.exports = router;