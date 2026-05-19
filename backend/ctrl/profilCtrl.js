const { User } = require('../models');

// GET PROFILE (user connecté)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['mdp'] }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// UPDATE PROFILE
exports.updateProfile = async (req, res) => {

    try {

        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // whitelist des champs autorisés
        const allowedFields = {

            firstName: req.body.firstName,

            lastName: req.body.lastName,

            age: req.body.age,

            pregnancyTryDuration:
            req.body.pregnancyTryDuration,

            isFirstIvf:
            req.body.isFirstIvf,

            previousAttempts:
            req.body.previousAttempts,

            followDoctor:
            req.body.followDoctor,

            emotionalState:
            req.body.emotionalState,

            treatmentStatus:
            req.body.treatmentStatus,

            phone:
            req.body.phone,

            avatar:
            req.body.avatar,

            notificationsEnabled:
            req.body.notificationsEnabled,

            language:
            req.body.language
        };

        // supprimer les champs undefined
        Object.keys(allowedFields).forEach((key) => {

            if (allowedFields[key] === undefined) {
                delete allowedFields[key];
            }
        });

        // update
        await user.update(allowedFields);

        // refresh user
        await user.reload();

        return res.status(200).json({

            message: "Profile updated successfully",

            user
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            message: error.message
        });
    }
};