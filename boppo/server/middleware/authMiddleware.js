const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = user;

            next();
        });
    } else {
        return res.status(401).json({ message: 'Authorization header required' });
    }
}

module.exports = authMiddleware;
