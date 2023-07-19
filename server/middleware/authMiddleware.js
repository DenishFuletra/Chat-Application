const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { OAuth2Client } = require('google-auth-library');

const oauth2Client = new OAuth2Client();

const verifyOauth2Token = async (token) => {
    const ticket = await oauth2Client.verifyIdToken({
        idToken: token,
        audience: ["724278904014-0npb7kh638ke8adigte0ut655tu0ugf9.apps.googleusercontent.com"]
    });
    return ticket.getPayload();
}

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const tokenInfo = await verifyOauth2Token(token);
        return res.send(tokenInfo);

        try {

            const decoded = await jwt.verify(token, process.env.JWTSECRET);

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