
const userService = require('../services/user');

exports.signup = async (req, res) => {
  try {
    const result = await userService.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await userService.getOneUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.modifyUser = async (req, res) => {
  try {
    await userService.modifyUser(req.params.id, req.body);
    res.status(200).json({ message: 'Utilisateur modifié !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'Utilisateur supprimé !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
