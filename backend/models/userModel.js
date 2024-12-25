const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,


    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation
    },
    password: {
        type: String,
        required: true,
    },

})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel;