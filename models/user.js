const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [
        {
            title: String,
            body: String,
            Date: Date
        }
    ]
});

const User = mongoose.model('User', UserSchema)

module.exports = User