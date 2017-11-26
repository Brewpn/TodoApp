const User = require('../../models/user').User;
const TodoFolder = require('../../models/user').TodoFolder;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.post = function (req, res, done) {

    const newFolder = req.body;

    User.findOne({_id: req.user.id})
        .exec()
        .then(user => {
            let newTodoFolder = new TodoFolder({
                _id : new ObjectId(),
                ownerId : user._id,
                title : newFolder.title,
                params : {
                    priority : newFolder.priority
                }
            });

            return(newTodoFolder);
        })
        .then(TodoFolder => {
            TodoFolder.save(function (err) {
                if (err)
                    throw err;
                res.redirect('/folderListOut');

            });
        })
        .catch(err => {
            return done(err)
        });

};