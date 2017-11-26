const TodoFolder = require('../../models/user').TodoFolder;

exports.get = function (req, res, done) {

    TodoFolder.find({ownerId : req.user._id}, function (err, todoFolder) {
        if (err)
            return done(err);

        res.json(todoFolder);

    });

};

