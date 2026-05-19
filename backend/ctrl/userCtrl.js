const { User } = require('../models');
const bcrypt = require('bcrypt');

//create
exports.createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            age,
            mdp,
            pregnancyTryDuration,
            isFirstIvf,
            previousAttempts,
            followDoctor,
            phone,
            language
        } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(mdp, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            age,
            mdp: hashedPassword,
            pregnancyTryDuration,
            isFirstIvf,
            previousAttempts,
            followDoctor,
            phone,
            language
        });

        return res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.update(req.body);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};