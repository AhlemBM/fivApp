// controllers/medicationCtrl.js

const { Medication } = require('../models');

exports.createMedication = async (req, res) => {
  try {

    const medication = await Medication.create(req.body);

    res.status(201).json({
      success: true,
      data: medication
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllMedications = async (req, res) => {
  try {

    const medications = await Medication.findAll();

    res.status(200).json({
      success: true,
      data: medications
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateMedication = async (req, res) => {
  try {

    const medication = await Medication.findByPk(req.params.id);

    if (!medication) {
      return res.status(404).json({
        success: false,
        message: 'Medication not found'
      });
    }

    await medication.update(req.body);

    res.status(200).json({
      success: true,
      data: medication
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteMedication = async (req, res) => {
  try {

    const medication = await Medication.findByPk(req.params.id);

    if (!medication) {
      return res.status(404).json({
        success: false,
        message: 'Medication not found'
      });
    }

    await medication.destroy();

    res.status(200).json({
      success: true,
      message: 'Medication deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};