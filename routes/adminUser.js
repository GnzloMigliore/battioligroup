const express = require('express');
const router = express.Router();
const path = require('path');



const adminOnly = require(path.resolve(__dirname, '..', 'middlewares', 'adminOnly'));
const controllersAdminUser = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdminUser'));
//armo mis rutas

router.get('/adminUser', adminOnly, controllersAdminUser.index);
router.post('/searchUser', adminOnly, controllersAdminUser.search);

module.exports = router;
