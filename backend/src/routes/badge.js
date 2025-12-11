const express = require('express');
const router = express.Router();
const badgeCtrl = require('../controllers/badge');
const auth = require('../middlewares/auth');
const checkRoles = require('../middlewares/checkRole');
const ROLES = require('../config/roles');

router.post('/', auth, checkRoles(ROLES.ADMIN), badgeCtrl.createBadge);
router.get('/', auth, checkRoles(ROLES.ADMIN), badgeCtrl.getAllBadges);
router.get('/:id',auth, checkRoles(ROLES.ADMIN), badgeCtrl.getOneBadge);
router.put('/:id', auth, checkRoles(ROLES.ADMIN), badgeCtrl.modifyBadge);
router.delete('/:id', auth, checkRoles(ROLES.ADMIN), badgeCtrl.deleteBadge);
router.get('/mine', auth, badgeCtrl.getMyBadges);

module.exports = router;
