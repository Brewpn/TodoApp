const mongoose =require('../lib/mongoose');
const util = require('util');

const userSchema = require('./userSchema');
const FolderListSchema = require('./folderSchema');
const todoSchema = require('./todoSchema');


exports.User = mongoose.model('User', userSchema);
exports.TodoFolder = mongoose.model('TodoFolder', FolderListSchema);
exports.todo = mongoose.model('Todo', todoSchema);