const socialService = require('../services/challengeSocial');

exports.invite = async (req, res) => {
    try {
        const invite = await socialService.inviteToChallenge({
            challengeId: req.params.id,
            fromUserId: req.auth.userId,
            toUserId: req.body.toUserId,
            message: req.body.message,
        });
        res.status(201).json({ message: 'Invitation envoyée', invite });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.myInvites = async (req, res) => {
    try {
        const invites = await socialService.getMyInvites(req.auth.userId);
        res.status(200).json(invites);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.respond = async (req, res) => {
    try {
        const invite = await socialService.respondToInvite({
            inviteId: req.params.inviteId,
            userId: req.auth.userId,
            action: req.body.action,
        });
        res.status(200).json({ message: 'Réponse enregistrée', invite });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.cancel = async (req, res) => {
    try {
        const invite = await socialService.cancelInvite({
            inviteId: req.params.inviteId,
            userId: req.auth.userId,
        });
        res.status(200).json({ message: 'Invitation annulée', invite });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};
