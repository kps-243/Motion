const express = require('express');
const router = express.Router({ mergeParams: true });
const gymEquipmentCtrl = require('../controllers/gymEquipment');
const auth = require('../middlewares/auth');
// const { isGymOwnerOrAdmin } = require('../middlewares/roles');

router.post('/', auth, /* isGymOwnerOrAdmin, */ gymEquipmentCtrl.addEquipmentToGym);
router.get('/', auth, gymEquipmentCtrl.getEquipmentsForGym);
router.patch('/:equipmentId', auth, /* isGymOwnerOrAdmin, */ gymEquipmentCtrl.updateGymEquipment);
router.delete('/:equipmentId', auth, /* isGymOwnerOrAdmin, */ gymEquipmentCtrl.removeEquipmentFromGym);

module.exports = router;
