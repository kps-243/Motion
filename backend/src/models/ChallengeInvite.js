const mongoose = require('mongoose');

const challengeInviteSchema = new mongoose.Schema({
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },

    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'DECLINED', 'CANCELED'],
        default: 'PENDING',
    },

    message: { type: String, trim: true },
}, { timestamps: true });

challengeInviteSchema.index({ challenge: 1, toUser: 1 }, { unique: true });

module.exports = mongoose.model('ChallengeInvite', challengeInviteSchema);
