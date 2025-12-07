const Challenge = require('../models/Challenge');
const Practice = require('../models/Practice');

exports.createChallenge = async (data) => {
  const { name, description, practices, createdBy, gymId } = data;

  // Vérifie si les practices existent
  const count = await Practice.countDocuments({ 
    _id: { $in: practices },
    gymId: gymId
  });

  if (count !== practices.length) {
    throw new Error("Certaines practices n'appartiennent pas à cette salle");
  }

  const challenge = new Challenge({
    name,
    description,
    practices,
    createdBy,
    gymId
  });

  return await challenge.save();
};

exports.getAllChallenges = async () => {
  return await Challenge.find().populate('practices').populate('createdBy');
};

exports.getOneChallenge = async (id) => {
  return await Challenge.findById(id)
    .populate('practices')
    .populate('createdBy')
    .populate('completedBy');
};

exports.modifyChallenge = async (id, data) => {
  return await Challenge.updateOne({ _id: id }, data);
};

exports.deleteChallenge = async (id) => {
  return await Challenge.deleteOne({ _id: id });
};

exports.completeChallenge = async (challengeId, userId) => {
  return await Challenge.findByIdAndUpdate(
    challengeId,
    { $addToSet: { completedBy: userId } },
    { new: true }
  );
};
