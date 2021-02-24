const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {users} = require ('../database/models');


module.exports = {
    index : async  (req,res) => {

   
        res.render(path.resolve(__dirname, '..','views', 'login'));
      },
      create : async  (req,res) => {
        const usuarios = await users.findAll()
   
        res.render(path.resolve(__dirname, '..','views', 'registro'),{usuarios});
      },
      registro : (req,res) => {
        let usuario={
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,      
            telephone: req.body.telephone,
            gender: req.body.gender,    
           
        };    
        //return res.send(usuario)
        users.create(usuario)
       
            return res.redirect('/');
   
       
      },
}
