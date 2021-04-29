const express = require('express');
const router = express.Router();
const path = require('path');


const userEdit = require(path.resolve(__dirname, '..', 'middlewares', 'userEdit'));
const adminOnly = require(path.resolve(__dirname, '..', 'middlewares', 'adminOnly'));
const controllersAdminUser = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdminUser'));
//armo mis rutas

router.get('/adminUser', adminOnly, controllersAdminUser.index);
router.get('/editUser/:id', adminOnly, controllersAdminUser.edit);
router.post('/update/:id', adminOnly,userEdit, controllersAdminUser.update);
router.post('/searchUser', adminOnly, controllersAdminUser.search);
router.get('/deleteUser/:id', [adminOnly], controllersAdminUser.delete);

module.exports = router;
