const User = require('../models/user.js')


const newNote = async (request, response, next) => {
    
    try {
        const user = await User.findById(request.userId.id)
        const newNote = user.notes.concat(request.body)
        user.notes = newNote

        await user.save();

        response.status(201).json(user)

    }catch(error) {
        next(error)
    }
}

const editNote = async (request, response, next) => {
    try {

        await User.findOneAndUpdate(
            { _id: request.userId.id, 'notes._id': request.params.id },
            {
              $set: {
                'notes.$.title': 'updated item2', 
                'notes.$.body': 'two updated',
              }
            },   
        );

        response.status(200).json('Edited');
    }catch(error) {
        next(error)
    }
}

const deleteNote = async (request, response, next) => {
    try {
        const user = await User.findById(request.userId.id)

        const note = user.notes.findIndex(note => note._id == request.params.id)
        user.notes.splice(1, note)

        const newNote = [...user.notes]
        user.notes = newNote

        await user.save()

        response.status(200).send('Note has been deleted')
    }catch(error) {
        next(error)
    }
}

module.exports = { newNote, editNote, deleteNote };