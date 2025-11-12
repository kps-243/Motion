const practiceService = require('../services/practice');

exports.createPractice = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdBy: req.auth.userId,
    };

    const practice = await practiceService.createPractice(data);
    res.status(201).json({ message: 'Exercice créé', practice });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Erreur lors de la création', error });
  }
};

exports.getAllPractices = async (req, res) => {
  try {
    const practices = await practiceService.getAllPractices();
    res.status(200).json(practices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOnePractice = async (req, res) => {
  try {
    const practice = await practiceService.getOnePractice(req.params.id);
    if (!practice) {
      return res.status(404).json({ message: 'Exercice non trouvé' });
    }
    res.status(200).json(practice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.modifyPractice = async (req, res) => {
  try {
    const practice = await practiceService.modifyPractice(req.params.id, req.body);
    if (!practice) {
      return res.status(404).json({ message: 'Exercice non trouvé' });
    }
    res.status(200).json(practice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePractice = async (req, res) => {
  try {
    const result = await practiceService.deletePractice(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Exercice non trouvé' });
    }
    res.status(200).json({ message: 'Exercice supprimé' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
