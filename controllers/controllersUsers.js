const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {users,products} = require ('../database/models');
const {
  check,
  validationResult,
  body
} = require('express-validator');

module.exports = {
    index : async  (req,res) => {

   
        res.render(path.resolve(__dirname, '..','views', 'login'));
      },
      create : async  (req,res) => {
     
   
        res.render(path.resolve(__dirname, '..','views', 'registro'));
      },
      registro :async (req,res) => {
         let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render(path.resolve(__dirname , '..','views','registro'), {
            errors: errors.errors,  old: req.body
        });
      }
        let usuario={
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            full_name:  req.body.first_name+" "+ req.body.last_name,
            email: req.body.email,
            password:bcrypt.hashSync(req.body.contraseña, 10),      
            telephone: req.body.telephone,
            adress: req.body.adress,
            dni: req.body.dni,
            gender: req.body.gender, 
            roles: 1,    
           
        };    
        //return res.send(usuario)
        let newuser = await users.create(usuario);
       
        let products_id = {user_id: newuser.id};
        //Hago el create de treatments pasandole la variable declarada acá arriba
      
        await products.create(products_id)

   
    
      const full_name = newuser.full_name;
      const email = req.body.email;
     
      contentHTML = `
      Estimado `+ full_name +`

      Le damos la bienvenida a Battioli Group. Gracias por depositar su confianza en nosotros. 
      
      En este email, le brindamos información de vital importancia para tener en cuenta.
      
      
      1 - Recuerde que realizamos envíos vía MARÍTIMO o AÉREO. Si usted desea que su envío sea vía MARÍTIMO, por favor, coloque la palabra MARÍTIMO o MAR en el paquete a ser enviado.
        Ejemplo: 	Jane Doe BG 0001
                MAR
      1420 NE Miami Pl, Suite 3211
      Miami, FL, 33132.
      
      2 - La dirección de nuestro depósito localizado en Miami, Florida es donde nuestros paquetes son recibidos, procesados y listos para enviarlos. Al momento de recibir mercadería y ser procesada, usted recibirá un email informando de sus respectivos paquetes. Así como también recibirá uno al momento que su carga ha sido despachada y se encuentra en tránsito. Recuerde que sus paquetes serán despachados una vez realizado el pago de flete. 
      
      3 - Nuestra dirección es:
          
      1420 NE Miami Pl,
      Suite/Apt 3211.
      Miami, FL, 33132
      
      4 - POR FAVOR ALERTAR CUANDO UN NÚMERO DE TRACKING/TRACKING NUMBER SEA BRINDADO DE PARTE DE LA EMPRESA EN DONDE USTED REALIZÓ SU COMPRA ASÍ NOSOTROS ESTAMOS PENDIENTES DE MERCADERÍA A RECIBIR. Por favor si es tan amable de alertarnos via WhatsApp/ Email o a través del siguiente formulario: 
      
      https://docs.google.com/forms/d/e/1FAIpQLSdDw4ywqdi4SQt4FxHXoeLfTKBiYd2ej8QJf87vpSm6s11slA/viewform?usp=sf_link 
      
      Para mayor información puede contactarnos vía email o Whatsapp al numero +1 (305) 775 9044. 
      
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
      subject: "Bienvenido a Battioli Group",
      text: contentHTML
      })
   
        .then((usuarioRegistrado) => {
          return res.redirect('/');
      })  
      .catch(error => res.render(path.resolve(__dirname , '..','views','registro'), {
        errors: errors.errors,  old: req.body}))    


   
       
      },
      login : async(req,res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render(path.resolve(__dirname, '..', 'views', 'login'), {
                errors: errors.mapped(),  old: req.body});
        } else{
          
            let usuarioLogueado = await users.findOne({
                where: {
                    email: req.body.email
                   }
            })
            
            delete usuarioLogueado.password;
           
            req.session.usuario = usuarioLogueado;

            //return res.send(req.session.usuario)
            if(req.body.recordarme){
                res.cookie('email', usuarioLogueado.email, {maxAge: 1000 * 60 * 60 * 48})
            }
      
            
            res.redirect("/");
        }
   
       
      },
      logout: (req, res) => {
        req.session.destroy();
        res.cookie('email',null,{maxAge: -1});
        res.redirect('/')
      },
      forget : async  (req,res) => {
        const usuarios = await users.findAll()
   
        res.render(path.resolve(__dirname, '..','views', 'forgetpassword'),{usuarios});
      },
      recoverpassword : async  (req,res) => {
        const usuarios = await users.findOne({
          where: {
              id: req.params.id
             }
      })
   
        res.render(path.resolve(__dirname, '..','views', 'recoverpassword'),{usuarios});
      },
      mensajerecover : async  (req,res) => {

   
        res.render(path.resolve(__dirname, '..','views', 'mensajerecover'));
      },
      notfound : async  (req,res) => {

   
        res.render(path.resolve(__dirname, '..','views', 'notfound'));
      },
      session: async  (req,res) => {
        const usuarios = await users.findOne({
          where: {
              id: req.params.id
             }
      })
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render(path.resolve(__dirname , '..','views','recoverpassword'), {
              usuarios, errors: errors.errors,  old: req.body
            });
          }
       
        const usuario_body = { 
          //return res.send(_body);
         
          
          password: bcrypt.hashSync(req.body.contraseña, 10),
          
      }
      users.update(usuario_body, {where: {id: req.params.id}})
      .then((usuario) => {
          return res.redirect('/');
      })  
      .catch(error => res.render(path.resolve(__dirname , '..','views','recoverpassword'), {usuarios,
        errors: errors.errors,  old: req.body}))     
      
      
      
        
   ;
      },
      sendmail : async  (req,res) => {
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
      text: "Ingresa al siguiente link para restablecer tu contraseña:  http://localhost:3000/recoverpassword/"+userId
      
      })
      res.redirect('/mensajerecover');
      }
      else{
        res.redirect('/usernotfound')
        }
   
     
      },
}
