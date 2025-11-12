const equipmentService = require('../services/equipment');

exports.createEquipment = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdBy: req.user.id,
    };
    const equipment = await equipmentService.createEquipment(data);
    res.status(201).json({ message: 'Équipement créé', equipment });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllEquipments = async (req, res) => {
  try {
    const equipments = await equipmentService.getAllEquipments();
    res.status(200).json(equipments);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneEquipment = async (req, res) => {
  try {
    const equipment = await equipmentService.getOneEquipment(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }
    res.status(200).json(equipment);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifyEquipment = async (req, res) => {
  try {
    const equipment = await equipmentService.modifyEquipment(req.params.id, req.body);
    if (!equipment) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }
    res.status(200).json(equipment);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const result = await equipmentService.deleteEquipment(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }
    res.status(200).json({ message: 'Équipement supprimé' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
