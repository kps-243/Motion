const mongoose = require('mongoose');
const ROLES = require('../config/roles');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: { type: String, enum: Object.values(ROLES), default: ROLES.CUSTOMER},
    });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)