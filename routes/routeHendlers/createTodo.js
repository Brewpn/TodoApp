const todo = require('../../models/user').todo;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.post = function (req, res, done) {

    let todoSet = new Promise((resolve, reject) => {
        const ownerId = req.user.id,
             {
            folderId,
            todoDescription
        } = req.body;

        let newTodo = new todo({
            _id: new ObjectId,
            ownerId,
            folderId,
            todoDescription
        });
        resolve(newTodo);
    });

    todoSet
        .then((newTodo) => {
        todo.create(newTodo)
        })
        .then(()=>{res.send(`done!`)});

};

// exports.post = function (req, res, done) {
//
//     const newTodo = req.body;
//
//     TodoFolder.findOne({_id : newTodo.folderId})
//         .exec()
//         .then( todoFolder => {
//             todoFolder.todoList.push({
//                 _id : new ObjectId(),
//                 todoDescription : newTodo.todoDescription
//             });
//
//             return todoFolder;
//         })
//         .then( todoFolder => {
//             todoFolder.save(err => {
//                 if (err)
//                     throw err;
//                 res.redirect('/folderListOut')
//             })
//         })
//         .catch(err => {
//             return done(err)
//         });
// };