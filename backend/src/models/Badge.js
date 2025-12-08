const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    description: {
        type: String,
    },

    icon: {
        type: String,
    },

    ruleType: {
        type: String,
        enum: ['TOTAL_CHALLENGES_COMPLETED'],
        required: true,
    },

    ruleValue: {
        type: Number,
        required: true,
        min: 1,
    },

    points: {
        type: Number,
        default: 0,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // admin
    },
}, { timestamps: true });

module.exports = mongoose.model('Badge', badgeSchema);
