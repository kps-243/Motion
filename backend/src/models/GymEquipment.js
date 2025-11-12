const mongoose = require('mongoose');

const gymEquipmentSchema = new mongoose.Schema({
  gym: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gym',
    required: true,
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0,
  },
});

gymEquipmentSchema.index({ gym: 1, equipment: 1 }, { unique: true });

module.exports = mongoose.model('GymEquipment', gymEquipmentSchema);
