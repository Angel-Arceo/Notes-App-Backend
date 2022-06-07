const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const register = async (request, response, next) => {
    const { username, password, notes } = request.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: passwordHash,
            notes
        })

        await newUser.save();

        //Create a token
        const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24})

        response.status(201).json({
            auth: true,
            token
        });

    }catch(error) {
        next(error)
    }
}

const login = async (request, response, next) => {

    const { username, password } = request.body

    try {
        const user = await User.findOne( {username: username} )
        if(!user) return response.status(404).json( { auth: null, message: "User not found"} )

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )
        
        if(!isPasswordCorrect) return response.status(401).json( { auth: false, message: "Wrong password or username :("})
        
        
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24})
        
        response.status(200).json( { auth: true, token} )


    }catch(error) {
        next(error)
    }

}

module.exports = { register, login}