const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const util = require('util');


const FolderListSchema = new Schema({

    ownerId : {
        type : ObjectId,
        ref : 'User'
    },
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
    }
});

module.exports = FolderListSchema;