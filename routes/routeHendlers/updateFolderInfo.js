const TodoFolder = require('../../models/user').TodoFolder;
const ObjectId = mongoose.Types.ObjectId;

exports.delete = function (req, res, done) {

    const newTodo = req.body;

    TodoFolder.findOne({_id : newTodo.folderId})
        .exec()
        .then( todoFolder => {
            todoFolder.todoList.push({
                _id : new ObjectId()
            })
        })
};