const mongoose =require('../lib/mongoose');
const util = require('util');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    google: {
        profileId: {
            type: String,
            unique: true,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
});

exports.User = mongoose.model('User', userSchema);