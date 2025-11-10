const express = require('express');
const router = express.Router();
const gymCtrl = require('../controllers/gym');


router.post('/', gymCtrl.createGym);
router.get('/', gymCtrl.getAllGyms);
router.get('/:id', gymCtrl.getOneGym);
router.put('/:id', gymCtrl.modifyGym);
router.delete('/:id', gymCtrl.deleteGym);

module.exports = router;