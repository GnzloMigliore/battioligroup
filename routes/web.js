const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');




const controllersWeb = require(path.resolve(__dirname, '..', 'controllers', 'controllersWeb'));
//armo mis rutas

router.get('/', controllersWeb.index);
router.get('/nosotros', controllersWeb.nosotros);
router.get('/servicios', controllersWeb.servicios);
router.get('/contacto', controllersWeb.contacto);
router.post('/sendmail', async (req,res)=>{
  
  
   
      const name = req.body.name;
      const email = req.body.email
      const phone = req.body.phone;
      const mensaje = req.body.mensaje
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
    to:"battioligroup@gmail.com",
    subject: "Nueva consulta",
    text: "Nombre: "+name
    +"                   Email: "+email
    +"                   Teléfono "+phone
    +"             Consulta: "+mensaje
    
  })
  res.redirect('/mensajeEnviado');
    }

  
  );
    
router.get('/mensajeEnviado', controllersWeb.mensajeEnviado);
module.exports = router;
