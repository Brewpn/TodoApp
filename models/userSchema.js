const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('util');

const FolderListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    params: {
        date: {
            type: Date,
            default: Date.now
        },
        success: {
            type: Boolean,
            default: false
        },
        priority: {
            type: String,
            default: "low"
        }
    },
    todoList: [{
        todoDescription: {
            type: String,
            required: true
        },
        todoDone: {
            type: Boolean,
            default: false
        }
    }]
});

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
    },
    folderList: FolderListSchema,
});

module.exports = UserSchema;