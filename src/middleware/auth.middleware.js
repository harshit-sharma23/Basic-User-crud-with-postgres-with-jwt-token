const jwt = require('jsonwebtoken');
const { secreteToken } = require('./../config/env.config');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({
            message:
                'Token is missing. You are not authorized to access this resource.',
        });
    }
    jwt.verify(token, secreteToken, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Token is invalid or expired.',
                error: err.message,
            });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
