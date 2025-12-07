const challengeService = require('../services/challenge');

exports.createChallenge = async (req, res) => {
  try {
    const challenge = await challengeService.createChallenge({
      ...req.body,
      createdBy: req.auth.userId
    });
    res.status(201).json(challenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await challengeService.getAllChallenges();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneChallenge = async (req, res) => {
  try {
    const challenge = await challengeService.getOneChallenge(req.params.id);
    res.status(200).json(challenge);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.modifyChallenge = async (req, res) => {
  try {
    await challengeService.modifyChallenge(req.params.id, req.body);
    res.status(200).json({ message: 'Challenge modifié !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteChallenge = async (req, res) => {
  try {
    await challengeService.deleteChallenge(req.params.id);
    res.status(200).json({ message: 'Challenge supprimé !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.completeChallenge = async (req, res) => {
  try {
    const result = await challengeService.completeChallenge(req.params.id, req.auth.userId);
    res.status(200).json({ message: "Challenge complété", result });
  } catch (error) {
    res.status(400).json({ error });
  }
};
