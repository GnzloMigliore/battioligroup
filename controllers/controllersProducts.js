const path = require('path');
const fs = require('fs');
const {users,products} = require ('../database/models');

const { Op, where } = require("sequelize");

module.exports = {
    index : async  (req,res) => {
        const usuario = await users.findAll({where: {id: req.params.id}})
        const producto = await products.findAll({where: {user_id: req.params.id,entrega: "NO entregado",  name_product: {
          [Op.ne]: '%null%' }}, order: [['createdAt', 'DESC']]})
          //return res.send(producto)
      res.render(path.resolve(__dirname, '..','views', 'miscompras'),{usuario,producto});
   
   
   
  },

}
