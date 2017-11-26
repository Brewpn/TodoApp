const TodoFolder = require('../../models/user').TodoFolder;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.post = function (req, res, done) {

    const newTodo = req.body;

    TodoFolder.findOne({_id : newTodo.folderId})
        .exec()
        .then( todoFolder => {
            if (!todoFolder.todoList)
                todoFolder.todoList = {};

            todoFolder.todoList.push({
                _id : new ObjectId(),
                todoDescription : newTodo.todoDescription
            });

            return todoFolder;
        })
        .then( todoFolder => {
            todoFolder.save(err => {
                if (err)
                    throw err;
                res.redirect('/todoListOut')
            })
        })
        .catch(err => {
            return done(err)
        });
};