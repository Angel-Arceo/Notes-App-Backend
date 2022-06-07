const jwt = request('jsonwebtoken');
require('dotenv').config();


const verifyToken = (request, response, next) => {
    const token = request.headers['x-access-token'];

    if(!token) return response.status(401).json({auth: false, message: 'No token provided'})

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    request.userId = decoded
    next()
}

module.exports = verifyToken;