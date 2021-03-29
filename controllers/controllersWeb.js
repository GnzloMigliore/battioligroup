const path = require('path');
const fs = require('fs');



module.exports = {
    index : async  (req,res) => {
   
   
    res.render(path.resolve(__dirname, '..', 'index'));
  },
  nosotros : async  (req,res) => {

   
    res.render(path.resolve(__dirname, '..','views', 'nosotros'));
  },
 servicios : async  (req,res) => {

   
    res.render(path.resolve(__dirname, '..','views', 'servicios'));
  },
  contacto : async  (req,res) => {

   
    res.render(path.resolve(__dirname, '..','views', 'contacto'));
  },
}
