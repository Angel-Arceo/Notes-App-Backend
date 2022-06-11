const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = async (request, response, next) => {
    const token = request.headers['x-access-token'];

    if(!token) return response.status(401).json( {auth: false, message: 'No token provided'} )

    const decoded = await jwt.verify(token, process.env.SECRET_KEY)

    request.userId = decoded
    next();
}

module.exports = verifyToken;