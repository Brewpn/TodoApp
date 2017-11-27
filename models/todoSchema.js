const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const util = require('util');

    const todoSchema = new Schema({
        _id: ObjectId,
        folderId: {
            type: ObjectId,
            ref: 'TodoFolder'
        },
        todoDescription: {
            type: String
        },
        todoDone: {
            type: Boolean,
            default: false
        }
    });

    module.exports = todoSchema;