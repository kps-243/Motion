const gymEquipmentService = require('../services/gymEquipment');

exports.addEquipmentToGym = async (req, res) => {
  try {
    const data = {
      gym: req.params.gymId,
      equipment: req.body.equipmentId,
      quantity: req.body.quantity,
    };
    const gymEquipment = await gymEquipmentService.addEquipmentToGym(data);
    res.status(201).json({ message: 'Équipement ajouté à la salle', gymEquipment });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getEquipmentsForGym = async (req, res) => {
  try {
    const list = await gymEquipmentService.getEquipmentsForGym(req.params.gymId);
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateGymEquipment = async (req, res) => {
  try {
    const gymEquipment = await gymEquipmentService.updateGymEquipment(
      req.params.gymId,
      req.params.equipmentId,
      { quantity: req.body.quantity },
    );

    if (!gymEquipment) {
      return res.status(404).json({ message: 'Équipement non trouvé pour cette salle' });
    }

    res.status(200).json(gymEquipment);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.removeEquipmentFromGym = async (req, res) => {
  try {
    const result = await gymEquipmentService.removeEquipmentFromGym(
      req.params.gymId,
      req.params.equipmentId,
    );

    if (!result) {
      return res.status(404).json({ message: 'Équipement non trouvé pour cette salle' });
    }

    res.status(200).json({ message: 'Équipement supprimé de la salle' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
