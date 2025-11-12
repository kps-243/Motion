const Equipment = require('../models/Equipment');

exports.createEquipment = async (data) => {
  const equipment = new Equipment(data);
  return await equipment.save();
};

exports.getAllEquipments = async () => {
  return await Equipment.find();
};

exports.getOneEquipment = async (id) => {
  return await Equipment.findById(id);
};

exports.modifyEquipment = async (id, data) => {
  return await Equipment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

exports.deleteEquipment = async (id) => {
  return await Equipment.findByIdAndDelete(id);
};
