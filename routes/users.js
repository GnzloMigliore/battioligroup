const express = require('express');
const router = express.Router();
const path = require('path');

const {
    check,
    validationResult,
    body
  } = require('express-validator');
  const {users} = require ('../database/models');
  const validacionRegistro = require(path.resolve(__dirname, '..', 'middlewares', 'validacionregistro'));
const validacionAcceso = require(path.resolve(__dirname, '..', 'middlewares', 'validacionacceso'));
const recover = require(path.resolve(__dirname, '..', 'middlewares', 'recover'));
const controllersUsers = require(path.resolve(__dirname, '..', 'controllers', 'controllersUsers'));
//armo mis rutas
router.get('/createuser', controllersUsers.create);
router.post('/registro',[validacionRegistro], controllersUsers.registro);
router.get('/login', controllersUsers.index);
router.post('/session',[validacionAcceso], controllersUsers.login);
router.get('/logout',[validacionAcceso], controllersUsers.logout);
router.get('/forgetpassword', controllersUsers.forget);
router.get('/recoverpassword/:id', controllersUsers.recoverpassword);
router.post('/session/:id',[recover], controllersUsers.session);
router.get('/mensajerecover', controllersUsers.mensajerecover);
router.get('/usernotfound', controllersUsers.notfound);
router.post('/forget', controllersUsers.sendmail);


module.exports = router;