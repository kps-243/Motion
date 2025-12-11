const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const checkRoles = require('../middlewares/checkRole');
const ROLES = require('../config/roles');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/',auth, checkRoles(ROLES.ADMIN), userCtrl.getAllUsers);
router.get('/:id',auth, checkRoles(ROLES.ADMIN), userCtrl.getOneUser);
router.put('/:id', auth, checkRoles(ROLES.ADMIN), userCtrl.modifyUser);
router.delete('/:id', auth, checkRoles(ROLES.ADMIN), userCtrl.deleteUser);

module.exports = router;
