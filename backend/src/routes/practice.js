const express = require('express');
const router = express.Router();
const practiceCtrl = require('../controllers/practice');
const auth = require('../middlewares/auth');
// const { isAdmin } = require('../middlewares/roles');

router.post('/', auth, /* isAdmin, */ practiceCtrl.createPractice);
router.get('/', practiceCtrl.getAllPractices);
router.get('/:id', practiceCtrl.getOnePractice);
router.put('/:id', auth, /* isAdmin, */ practiceCtrl.modifyPractice);
router.delete('/:id', auth, /* isAdmin, */ practiceCtrl.deletePractice);

module.exports = router;
