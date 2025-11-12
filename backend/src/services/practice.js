const Practice = require('../models/Practice');

exports.createPractice = async (data) => {
  const practice = new Practice(data);
  return await practice.save();
};

exports.getAllPractices = async (filters = {}) => {
  return await Practice.find(filters);
};

exports.getOnePractice = async (id) => {
  return await Practice.findById(id);
};

exports.modifyPractice = async (id, data) => {
  return await Practice.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

exports.deletePractice = async (id) => {
  return await Practice.findByIdAndDelete(id);
};
