const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {users} = require ('../database/models');
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
        let usuario={
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password:bcrypt.hashSync(req.body.contraseña, 10),      
            telephone: req.body.telephone,
            gender: req.body.gender,    
           
        };    
        //return res.send(usuario)
        users.create(usuario)
       
            return res.redirect('/');
   
       
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
}
