const express = require('express');
const router = express.Router();

const password = require('../middlewares/password');
const email = require('../middlewares/email');

const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');

router.post('/signup', email, password, authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.login);

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
