const User = require('../models/user.js')

const getUser = async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)

        response.status(200).json(user)

    }catch(error) {
        next(error)
    }
}

const getUsers = async (request, response, next) => {
    try {
        const users = await User.find({})

        response.status(200).json(users)
    }catch(error) {
        next(error)
    }
}

const deleteUser = async (request, response, next) => {
    try {
        await User.findByIdAndDelete(request.params.id)

        response.status(200).send('User has been deleted')
    }catch(error) {
        next(error)
    }
}

module.exports = { getUser, getUsers, deleteUser };