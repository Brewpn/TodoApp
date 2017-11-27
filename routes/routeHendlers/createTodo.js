const todo = require('../../models/user').todo;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.post = function (req, res, done) {

    let Todoset = new Promise((resolve, reject) => {
        const {
            folderId: _folderId,
            todoDescription: _todoDescription
        } = req.body;

        let newtodo = new todo({
            _id: new ObjectId,
            folderId: _folderId,
            todoDescription: _todoDescription
        });
        resolve(newtodo);
    });

    Todoset
        .then((newTodo) => {
        todo.create(newTodo)
        })
        .then(()=>{res.send(`done!`)})

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