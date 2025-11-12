const express = require('express');
const router = express.Router();
const equipmentCtrl = require('../controllers/equipment');
const auth = require('../middlewares/auth');
// const { isAdmin } = require('../middlewares/roles');

router.post('/', auth, /* isAdmin, */ equipmentCtrl.createEquipment);
router.get('/', equipmentCtrl.getAllEquipments);
router.get('/:id', equipmentCtrl.getOneEquipment);
router.put('/:id', auth, /* isAdmin, */ equipmentCtrl.modifyEquipment);
router.delete('/:id', auth, /* isAdmin, */ equipmentCtrl.deleteEquipment);

module.exports = router;
