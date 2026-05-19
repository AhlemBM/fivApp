const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET =" process.env.JWT_SECRET";
// REGISTER (optionnel mais recommandé)
/*exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, mdp, age } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(mdp, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            mdp: hashedPassword,
            age
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};*/


// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, mdp } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(mdp, user.mdp);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET || "secret_key",
            { expiresIn: "7d" }
        );
        console.log(token);
        console.log(JWT_SECRET);
        return res.status(200).json({
            message: "Login successful",
            token,
            user
        });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// LOGOUT (stateless JWT)
exports.logout = async (req, res) => {
    try {
        // JWT logout = côté frontend tu supprimes le token
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};