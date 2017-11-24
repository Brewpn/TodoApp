const User = require('../../models/user').User;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const async = require('async');


exports.post = function (req, res, done) {

    const newFolder = req.body;



    async.waterfall([
        function (callback) {
            User.findOne({_id: req.user.id}, callback);
        },
        function (user, callback) {
            if (!user.folderList)
                user.folderList = {};

            user.folderList.push({
                _id : new ObjectId(),
                title: newFolder.title,
                params: {
                    priority: newFolder.params.priority
                }
            });
            callback(null, user);
        },
        function (user) {
            user.save(function (err) {
                if (err)
                    throw err;
                res.redirect('/folderListOut');

            });

        }
    ]);

};