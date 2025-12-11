const express = require('express');
const router = express.Router();
const practiceCtrl = require('../controllers/practice');
const auth = require('../middlewares/auth');
const checkRoles = require('../middlewares/checkRole');
const ROLES = require('../config/roles');

router.post('/',   auth, checkRoles(ROLES.ADMIN), practiceCtrl.createPractice);
router.put('/:id', auth, checkRoles(ROLES.ADMIN), practiceCtrl.modifyPractice);
router.delete('/:id', auth, checkRoles(ROLES.ADMIN), practiceCtrl.deletePractice);
router.get('/', practiceCtrl.getAllPractices);
router.get('/:id', practiceCtrl.getOnePractice);

module.exports = router;
