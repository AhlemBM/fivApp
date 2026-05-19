const { EmotionalContent } = require('../models');

// GET ALL CONTENTS
exports.getAll = async (req, res) => {
    try {

        const contents = await EmotionalContent.findAll();

        res.status(200).json({
            success: true,
            data: contents
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET BY TYPE (comfort, meditation, etc.)
exports.getByType = async (req, res) => {
    try {

        const { type } = req.params;

        const content = await EmotionalContent.findOne({
            where: { type }
        });

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        res.status(200).json({
            success: true,
            data: content
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CREATE CONTENT (admin use)
exports.create = async (req, res) => {
    try {

        const content = await EmotionalContent.create(req.body);

        res.status(201).json({
            success: true,
            data: content
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE CONTENT
exports.update = async (req, res) => {
    try {

        const content = await EmotionalContent.findByPk(req.params.id);

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        await content.update(req.body);

        res.status(200).json({
            success: true,
            data: content
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE CONTENT
exports.remove = async (req, res) => {
    try {

        const content = await EmotionalContent.findByPk(req.params.id);

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        await content.destroy();

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