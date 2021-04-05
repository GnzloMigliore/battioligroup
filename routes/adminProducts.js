const express = require('express');
const router = express.Router();
const path = require('path');



const adminOnly = require(path.resolve(__dirname, '..', 'middlewares', 'adminOnly'));
const controllersAdminProducts = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdminProducts'));
//armo mis rutas

router.get('/adminProducts/:id', adminOnly, controllersAdminProducts.show);
router.post('/product/create/:id', controllersAdminProducts.save);
router.get('/products/edit/:id', adminOnly, controllersAdminProducts.update);
router.post('/update/:id', adminOnly, controllersAdminProducts.updatesave);
module.exports = router;
