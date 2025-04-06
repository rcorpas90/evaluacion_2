require("dotenv").config();
const secretKey = process.env.secretKey;
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido o expirado' });
            }
            req.user = decoded;
            next();
        });
    } else {
        return res.status(403).json({ message: 'No se proporcionó token' });
    }
}