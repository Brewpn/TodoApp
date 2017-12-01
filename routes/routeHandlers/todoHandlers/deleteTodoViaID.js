const todo = require('../../../models/user').todo;

exports.delete = function (req, res, done) {
    const _id = req.body.id,
        ownerId = req.user.id;

    todo.findOneAndRemove({
        _id,
        ownerId
    })
        .then((result) => res.send(`todo with ID ${_id} have been deleted`))
        .catch((err)=> res.send(err)); //DEVELOPMENT
};