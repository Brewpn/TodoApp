const mongoose =require('../lib/mongoose');
const util = require('util');

const userSchema = require('./userSchema');
const FolderListSchema = require('./folderSchema');

exports.User = mongoose.model('User', userSchema);
exports.TodoFolder = mongoose.model('TodoFolder', FolderListSchema);