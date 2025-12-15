const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const socialCtrl = require('../controllers/challengeSocial');

router.post('/challenge/:id/invite', auth, socialCtrl.invite);

router.get('/invites/me', auth, socialCtrl.myInvites);

router.post('/invites/:inviteId/respond', auth, socialCtrl.respond);

router.post('/invites/:inviteId/cancel', auth, socialCtrl.cancel);

module.exports = router;
