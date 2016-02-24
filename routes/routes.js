var express = require('express');

var auth = require('../security/auth.js');

var userController = require('../controllers/userController.js');

var accountController = require('../controllers/accountController.js');

var router = express.Router();

router.post('/users', auth.authorize, userController.create);

router.get('/users', auth.authorize, userController.get);

router.get('/users/:id', auth.isAdmin, userController.getById);

router.put('/users/:id', auth.isAdmin, userController.update);

router.delete('/users/:id', auth.isAdmin, userController.remove);

router.post('/login', accountController.authenticate);

module.exports = router;
