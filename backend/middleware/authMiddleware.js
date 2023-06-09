const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
        try {
           console.log(token);
            const decoded = await jwt.verify(token, process.env.JWTSECRET);
            console.log(decoded);

            req.user = await User.findOne({ _id: decoded.id }).select('-password');

            if (!req.user) {
                return res.status(401).send({ message: 'Please login again!' })
            }
            next();
        }
        catch (err) {
            return res.status(500).send({ message: err.message })
            console.log(err.message)
        }
    }

}

module.exports = {
    checkAuth
}