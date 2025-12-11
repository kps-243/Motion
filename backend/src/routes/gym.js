const express = require('express');
const router = express.Router();
const gymCtrl = require('../controllers/gym');
const auth = require('../middlewares/auth');
const checkRoles = require('../middlewares/checkRole');
const ROLES = require('../config/roles');

router.post('/', auth, checkRoles(ROLES.OWNER, ROLES.ADMIN), gymCtrl.createGym);
router.get('/', gymCtrl.getAllGyms);
router.get('/:id', gymCtrl.getOneGym);
router.put('/:id', auth, checkRoles(ROLES.OWNER, ROLES.ADMIN), gymCtrl.modifyGym);
router.delete('/:id', auth, checkRoles(ROLES.ADMIN), gymCtrl.deleteGym);

module.exports = router;
