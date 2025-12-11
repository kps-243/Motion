const express = require('express');
const router = express.Router({ mergeParams: true });
const gymEquipmentCtrl = require('../controllers/gymEquipment');
const auth = require('../middlewares/auth');
const checkRoles = require('../middlewares/checkRole');
const ROLES = require('../config/roles');

router.post('/', auth, checkRoles(ROLES.OWNER, ROLES.ADMIN), gymEquipmentCtrl.addEquipmentToGym);
router.patch('/:equipmentId', auth, checkRoles(ROLES.OWNER, ROLES.ADMIN), gymEquipmentCtrl.updateGymEquipment);
router.delete('/:equipmentId', auth, checkRoles(ROLES.OWNER, ROLES.ADMIN), gymEquipmentCtrl.removeEquipmentFromGym);

router.get('/', auth, gymEquipmentCtrl.getEquipmentsForGym);

module.exports = router;
