const TodoFolder = require('../../../models/user').TodoFolder;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.put = function (req, res, done) {

    function updateFolder({folderId, title, priority, success}) {
        res.send(arguments);
    }
    updateFolder(req.body);
    // const newTodo = req.body;
    //
    // TodoFolder.findOne({_id : newTodo.folderId})
    //     .exec()
    //     .then( todoFolder => {
    //         todoFolder.todoList.push({
    //             _id : new ObjectId()
    //         })
    //     })
};