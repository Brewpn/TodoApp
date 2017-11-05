const User = require('../models/user').User;

exports.get = function (req, res, done) {

    User.findOne({'google.profileId' : req.user.google.profileId}, function (err, user) {
        if (err) done(err);

        res.json(user.folderList);
    });

};
