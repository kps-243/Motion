const badgeService = require('../services/badge');

exports.createBadge = async (req, res) => {
    try {
        const data = {
            ...req.body,
            createdBy: req.auth.userId,
        };

        const badge = await badgeService.createBadge(data);
        res.status(201).json({ message: 'Badge créé', badge });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllBadges = async (req, res) => {
    try {
        const badges = await badgeService.getAllBadges();
        res.status(200).json(badges);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOneBadge = async (req, res) => {
    try {
        const badge = await badgeService.getOneBadge(req.params.id);
        if (!badge) {
            return res.status(404).json({ message: 'Badge non trouvé' });
        }
        res.status(200).json(badge);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.modifyBadge = async (req, res) => {
    try {
        const badge = await badgeService.modifyBadge(req.params.id, req.body);
        if (!badge) {
            return res.status(404).json({ message: 'Badge non trouvé' });
        }
        res.status(200).json(badge);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBadge = async (req, res) => {
    try {
        const deleted = await badgeService.deleteBadge(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Badge non trouvé' });
        }
        res.status(200).json({ message: 'Badge supprimé' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMyBadges = async (req, res) => {
    try {
        const badges = await badgeService.getBadgesForUser(req.auth.userId);
        res.status(200).json(badges);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
