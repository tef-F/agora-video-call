const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: 'Name is required!'
        },
        username: {
            type: String,
            require: 'Username is required!',
            unique: true
        },
        email: {
            type: String,
            require: 'Email is required!'
        },
        password: {
            type: String,
            require: 'Password is required!'
        },
        status: {
            type: String,
            default: 'active',
        }
    }
);

module.exports = mongoose.model('user', userSchema);
