const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'please enter a product name']
        },
        email: {
            type: String,
            require: [true, 'please enter a email']
        },
        contact: {
            type: Number,
            require: [true]
        },
        password: {
            type: String,
            require: [true]
        },

    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;