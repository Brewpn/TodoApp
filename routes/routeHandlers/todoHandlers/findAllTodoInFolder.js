const todo = require('../../../models/user').todo;

exports.get = function (req,res,done) {
    todo.find({ownerId: req.user.id, folderId: req.params.id})

        .exec()
        .then((result) => res.json(result))
        .catch((err) => done(err));

};