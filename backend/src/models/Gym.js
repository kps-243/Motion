const mongoose = require('mongoose');

const gymSchema = mongoose.Schema({
    name: {type: String, require: true },
    description: {type: String, require: true },
    capacity: {type: Number, require: true },
    // TODO : Link Gym with user
    //userId: {type: String, require: true },
    address: {type: String, require: true },
    city: {type: String, require: true },
    zipCode: {type: Number, require: true },
    contact: {type: Number, require: true },
}); 

module.exports = mongoose.model('Gym', gymSchema);