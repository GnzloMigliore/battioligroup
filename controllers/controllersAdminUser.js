const path = require('path');
const fs = require('fs');
const { Op, where } = require("sequelize");
const {users,products} = require ('../database/models');
const {
  check,
  validationResult,
  body
} = require('express-validator');

module.exports = {
    index : async  (req,res) => {
        const usuarios = await users.findAll()
   
    res.render(path.resolve(__dirname, '..','views', 'adminUser'),{usuarios});
  },
  edit : async  (req,res) => {
    const usuario = await users.findByPk(req.params.id)

res.render(path.resolve(__dirname, '..','views', 'editUser'),{usuario});
},
update : async  (req,res) => {
  const usuario = await users.findByPk(req.params.id)
  let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render(path.resolve(__dirname , '..','views','editUser'),{usuario,
            errors: errors.errors,  old: req.body
        });
      }
  let usuario_body={
    first_name: req.body.nombre,
    last_name : req.body.apellido,
    full_name:  req.body.nombre+" "+ req.body.apellido,
    email: req.body.email,     
    telephone: req.body.telephone,
    adress: req.body.adress,
    dni: req.body.dni,
    gender: req.body.genero,    
    
};    
//return res.send(req.params.id)
let newUser = await users.update(usuario_body, {where: {id: req.params.id}})
.then((usercreate) => {
  return res.redirect('/adminUser');
})  
.catch(errors => res.render(path.resolve(__dirname , '..','views','editUsers'), {usuario,
  errors: errors.errors,  old: req.body}))  
  return res.redirect("/adminUser");
},
  search:async (req,res)=>{

    const usuarios = await users.findAll({ 
      where:{
        [Op.or]:
         [{full_name: {[Op.like]: `%${req.body.search}%`}},
        ]
      }
    
    })


    
    //return res.send(tratamiento)
    res.render(path.resolve(__dirname, '..', 'views', 'adminUser'), {usuarios})
  },
  delete : async  (req,res) => {
    const productos = await products.findAll({where:{user_id:req.params.id}})
    const usuario = await users.findByPk(req.params.id);
  //return res.send(productos)
    await products.destroy({where:{user_id:req.params.id}});
    await usuario.destroy();
    res.redirect("/adminUser");
  }
}
