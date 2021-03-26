const path = require('path');
const fs = require('fs');
const { Op, where } = require("sequelize");
const {users} = require ('../database/models');


module.exports = {
    index : async  (req,res) => {
        const usuarios = await users.findAll()
   
    res.render(path.resolve(__dirname, '..','views', 'adminUser'),{usuarios});
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

}
