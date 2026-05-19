// controllers/cycleCtrl.js

const { Cycle, Medication, Appointment } = require('../models');

exports.createCycle = async (req, res) => {
    try {

        const cycle = await Cycle.create(req.body);

        res.status(201).json({
            success: true,
            data: cycle
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllCycles = async (req, res) => {
    try {

        const cycles = await Cycle.findAll({
            include: [
                {
                    model: Medication,
                    as: 'medications'
                },
                {
                    model: Appointment,
                    as: 'appointments'
                }
            ]
        });

        res.status(200).json({
            success: true,
            data: cycles
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getCycleById = async (req, res) => {
    try {

        const cycle = await Cycle.findByPk(req.params.id, {
            include: [
                {
                    model: Medication,
                    as: 'medications'
                },
                {
                    model: Appointment,
                    as: 'appointments'
                }
            ]
        });

        if (!cycle) {
            return res.status(404).json({
                success: false,
                message: 'Cycle not found'
            });
        }

        res.status(200).json({
            success: true,
            data: cycle
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateCycle = async (req, res) => {
    try {

        const cycle = await Cycle.findByPk(req.params.id);

        if (!cycle) {
            return res.status(404).json({
                success: false,
                message: 'Cycle not found'
            });
        }

        await cycle.update(req.body);

        res.status(200).json({
            success: true,
            data: cycle
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteCycle = async (req, res) => {
    try {

        const cycle = await Cycle.findByPk(req.params.id);

        if (!cycle) {
            return res.status(404).json({
                success: false,
                message: 'Cycle not found'
            });
        }

        await cycle.destroy();

        res.status(200).json({
            success: true,
            message: 'Cycle deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};