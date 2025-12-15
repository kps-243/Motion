const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
    try {
        const top = await User.find()
            .select('name firstName email role score')
            .sort({ score: -1 })
            .limit(20);

        res.status(200).json(top);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
