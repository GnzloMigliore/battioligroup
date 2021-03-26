const express = require('express');
const router = express.Router();
const path = require('path');




const controllersAdminUser = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdminUser'));
//armo mis rutas

router.get('/adminUser', controllersAdminUser.index);
router.post('/searchUser', controllersAdminUser.search);

module.exports = router;
