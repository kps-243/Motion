const gymService = require('../services/gym');

exports.createGym = async (req, res) => {
  try {
    const data = {
      ...req.body,
      owner: req.user.id,
    };

    const gym = await gymService.createGym(data);
    res.status(201).json({ message: 'Salle de sport créée !', gym });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllGyms = async (req, res) => {
  try {
    const gyms = await gymService.getAllGyms();
    res.status(200).json(gyms);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneGym = async (req, res) => {
  try {
    const gym = await gymService.getOneGym(req.params.id);
    if (!gym) return res.status(404).json({ message: 'Salle de sport non trouvé' });
    res.status(200).json(gym);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.modifyGym = async (req, res) => {
  try {
    await gymService.modifyGym(req.params.id, req.body);
    res.status(200).json({ message: 'Salle de sport modifié !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteGym = async (req, res) => {
  try {
    await gymService.deleteGym(req.params.id);
    res.status(200).json({ message: 'Salle de sport supprimé !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};