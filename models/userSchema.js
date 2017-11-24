const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const util = require('util');

const FolderListSchema = new Schema({

    _id : ObjectId,
    title: {
        type: String
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
            type: String
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
    folderList: {
        type: Array,
        FolderListSchema
    },
});

module.exports = UserSchema;