const mongoose = require('mongoose');
const config = require('../config/index');

mongoose.Promise = global.Promise;

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;