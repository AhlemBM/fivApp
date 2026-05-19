// controllers/appointmentCtrl.js

const { Appointment } = require('../models');

exports.createAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.create(req.body);

        res.status(201).json({
            success: true,
            data: appointment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {

        const appointments = await Appointment.findAll();

        res.status(200).json({
            success: true,
            data: appointments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        await appointment.update(req.body);

        res.status(200).json({
            success: true,
            data: appointment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        await appointment.destroy();

        res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};