const express = require('express');
const router = express.Router();
const path = require('path');




const controllersAdminProducts = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdminProducts'));
//armo mis rutas

router.get('/adminProducts/:id', controllersAdminProducts.show);
router.post('/product/create/:id', controllersAdminProducts.save);
router.get('/products/edit/:id', controllersAdminProducts.update);
router.post('/update/:id', controllersAdminProducts.updatesave);
module.exports = router;
