const express = require('express');
const router = express.Router();
const path = require('path');



const adminOnly = require(path.resolve(__dirname, '..', 'middlewares', 'adminOnly'));
const controllersAdminProducts = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdminProducts'));
//armo mis rutas

router.get('/adminProducts/:id', adminOnly, controllersAdminProducts.show);
router.get('/allproducts', adminOnly, controllersAdminProducts.allproducts);
router.get('/allproductsx', adminOnly, controllersAdminProducts.allproductsx);
router.get('/allproductstic', adminOnly, controllersAdminProducts.allproductstic);
router.post('/product/create/:id', controllersAdminProducts.save);
router.get('/products/edit/:id', adminOnly, controllersAdminProducts.update);
router.post('/update/:id', adminOnly, controllersAdminProducts.updatesave);
router.get('/products/delete/:id', adminOnly, controllersAdminProducts.delete);
module.exports = router;
