const User = require('../../models/user').User;

exports.get = function (req, res, done) {

    User.findOne({_id : req.user._id}, function (err, user) {
        if (err)
            return done(err);

        res.json(user.folderList);

    });

};

