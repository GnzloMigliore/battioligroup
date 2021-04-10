const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
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
router.post('/forget', async (req,res)=>{
  let user = await users.findOne({
    where: {
        email: req.body.email
       }
       
});
  
if (user) {
const email = req.body.email
const userId = user.id;
contentHTML = `
<h1>Consulta<h1>
`; 

const transporter = nodemailer.createTransport({
host:'battioligroup.com',
port:  25,
secure:false,
auth:{
  user:"Maria@battioligroup.com",
  pass:'gallo2573'


},
tls:{
  rejectUnauthorized:false
}
});
await transporter.sendMail({
from: "no-reply@battioligroup.com",
to: email,
subject: "Recuperá tu contraseña",
text: "Ingresa al siguiente link para restablecer tu contraseña:  http://battioligroup.com/recoverpassword/"+userId

})
res.redirect('/mensajerecover');
}
else{
  res.redirect('/usernotfound')
  }
});

module.exports = router;