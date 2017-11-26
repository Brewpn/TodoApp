const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const util = require('util');

const UserSchema = new Schema({
        google: {
            profileId: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    });

module.exports = UserSchema;