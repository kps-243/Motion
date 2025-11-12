const GymEquipment = require('../models/GymEquipment');

exports.addEquipmentToGym = async (data) => {
  const gymEquipment = new GymEquipment(data);
  return await gymEquipment.save();
};

exports.getEquipmentsForGym = async (gymId) => {
  return await GymEquipment
    .find({ gym: gymId })
    .populate('equipment');
};

exports.updateGymEquipment = async (gymId, equipmentId, data) => {
  return await GymEquipment.findOneAndUpdate(
    { gym: gymId, equipment: equipmentId },
    data,
    { new: true, runValidators: true },
  );
};

exports.removeEquipmentFromGym = async (gymId, equipmentId) => {
  return await GymEquipment.findOneAndDelete({ gym: gymId, equipment: equipmentId });
};
