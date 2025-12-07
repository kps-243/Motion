const express = require('express');
const router = express.Router();

const challengeCtrl = require('../controllers/challenge');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');


router.post('/', auth, checkRole('customer'), challengeCtrl.createChallenge);

router.get('/', auth, challengeCtrl.getAllChallenges);
router.get('/:id', auth, challengeCtrl.getOneChallenge);


router.put('/:id', auth, checkRole('customer', 'admin'), challengeCtrl.modifyChallenge);
router.delete('/:id', auth, checkRole('customer', 'admin'), challengeCtrl.deleteChallenge);

router.post('/:id/complete', auth, checkRole('customer'), challengeCtrl.completeChallenge);

module.exports = router;
