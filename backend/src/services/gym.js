const Gym = require('../models/Gym');

exports.createGym = async (data) => {
  const gym = new Gym(data);
  return await gym.save();
};

exports.getAllGyms = async () => {
  return await Gym.find();
};

exports.getOneGym = async (id) => {
  return await Gym.findById(id);
};

exports.modifyGym = async (id, data) => {
  return await Gym.updateOne({ _id: id }, { ...data, _id: id });
};

exports.deleteGym = async (id) => {
  return await Gym.deleteOne({ _id: id });
};
