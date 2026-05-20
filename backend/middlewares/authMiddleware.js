const jwt = require('jsonwebtoken');

const JWT_SECRET = " process.env.JWT_SECRET";

module.exports = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token missing or invalid"
            });
        }

        const token = authHeader.substring(7);

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
        console.log(token);
        console.log(JWT_SECRET);

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
