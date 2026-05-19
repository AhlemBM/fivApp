const { MoodCheckin } = require('../models');

// CREATE MOOD CHECKIN
exports.create = async (req, res) => {
    try {

        const data = req.body;

        const checkin = await MoodCheckin.create(data);

        res.status(201).json({
            success: true,
            data: checkin
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL USER CHECKINS
exports.getAllByUser = async (req, res) => {
    try {

        const { userId } = req.params;

        const checkins = await MoodCheckin.findAll({
            where: { userId },
            order: [['checkinDate', 'DESC']]
        });

        res.status(200).json({
            success: true,
            data: checkins
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET TODAY CHECKIN
exports.getToday = async (req, res) => {
    try {

        const { userId } = req.params;

        const today = new Date().toISOString().split('T')[0];

        const checkin = await MoodCheckin.findOne({
            where: {
                userId,
                checkinDate: today
            }
        });

        res.status(200).json({
            success: true,
            data: checkin
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE CHECKIN
exports.update = async (req, res) => {
    try {

        const checkin = await MoodCheckin.findByPk(req.params.id);

        if (!checkin) {
            return res.status(404).json({
                success: false,
                message: 'Checkin not found'
            });
        }

        await checkin.update(req.body);

        res.status(200).json({
            success: true,
            data: checkin
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE CHECKIN
exports.remove = async (req, res) => {
    try {

        const checkin = await MoodCheckin.findByPk(req.params.id);

        if (!checkin) {
            return res.status(404).json({
                success: false,
                message: 'Checkin not found'
            });
        }

        await checkin.destroy();

        res.status(200).json({
            success: true,
            message: 'Deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};