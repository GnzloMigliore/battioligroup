const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
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
        const usuarios = await users.findAll()
   
        res.render(path.resolve(__dirname, '..','views', 'registro'),{usuarios});
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
}
