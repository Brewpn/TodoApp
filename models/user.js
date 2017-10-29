const mongoose =require('../lib/mongoose');
const util = require('util');

const userSchema = require('./userSchema');

exports.User = mongoose.model('User', userSchema);