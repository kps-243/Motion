const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const Challenge = require('../models/Challenge');
const User = require('../models/User');

exports.createBadge = async (data) => {
    const badge = new Badge(data);
    return await badge.save();
};

exports.getAllBadges = async () => {
    return await Badge.find();
};

exports.getOneBadge = async (id) => {
    return await Badge.findById(id);
};

exports.modifyBadge = async (id, data) => {
    return await Badge.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

exports.deleteBadge = async (id) => {
    return await Badge.findByIdAndDelete(id);
};

exports.getBadgesForUser = async (userId) => {
    return await UserBadge.find({ user: userId }).populate('badge');
};

exports.checkAndAwardBadgesForUser = async (userId) => {
    const badges = await Badge.find({ isActive: true });

    const totalCompleted = await Challenge.countDocuments({
        completedBy: userId,
    });

    const newlyAwarded = [];

    for (const badge of badges) {
        let conditionOK = false;

        switch (badge.ruleType) {
            case 'TOTAL_CHALLENGES_COMPLETED':
                conditionOK = totalCompleted >= badge.ruleValue;
                break;
            default:
                conditionOK = false;
        }

        if (!conditionOK) continue;

        const already = await UserBadge.findOne({
            user: userId,
            badge: badge._id,
        });
        if (already) continue;

        const userBadge = await UserBadge.create({
            user: userId,
            badge: badge._id,
        });
        newlyAwarded.push(userBadge);

        if (badge.points && badge.points > 0) {
            await User.findByIdAndUpdate(userId, { $inc: { score: badge.points } });
        }
    }

    return newlyAwarded;
};
