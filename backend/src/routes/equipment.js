const express = require('express');
const router = express.Router();
const equipmentCtrl = require('../controllers/equipment');
const auth = require('../middlewares/auth');
const checkRoles = require('../middlewares/checkRole');
const ROLES = require('../config/roles');

router.post('/',   auth, checkRoles(ROLES.ADMIN), equipmentCtrl.createEquipment);
router.put('/:id', auth, checkRoles(ROLES.ADMIN), equipmentCtrl.modifyEquipment);
router.delete('/:id', auth, checkRoles(ROLES.ADMIN), equipmentCtrl.deleteEquipment);
router.get('/', equipmentCtrl.getAllEquipments);
router.get('/:id', equipmentCtrl.getOneEquipment);

module.exports = router;
