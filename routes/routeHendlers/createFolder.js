const Folder = require('../../models/user').TodoFolder;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.post = function (req, res, done) {


    let FolderSet = new Promise((resolve, reject) => {
        const _OwnerId = req.user.id,
            {
                title: _title = `${req.user.google.name}'s folder`,
                priority: _priority = `low`,
            } = req.body;

        let folder = new Folder({
            _id: new ObjectId,
            ownerId: _OwnerId,
            title: _title,
            params: {
                priority: _priority
            }
        });
        resolve(folder)

    });

    FolderSet
        .then((folder) => {
            Folder.create(folder)
        })
        .then(()=>{
                res.redirect('/folderListOut');
        });



    //
    // const newFolder = req.body;
    //
    // User.findOne({_id: req.user.id})
    //     .exec()
    //     .then(user => {
    //         let newTodoFolder = new TodoFolder({
    //             _id : new ObjectId(),
    //             ownerId : user._id,
    //             title : newFolder.title,
    //             params : {
    //                 priority : newFolder.priority
    //             }
    //         });
    //
    //         return(newTodoFolder);
    //     })
    //     .then(TodoFolder => {
    //         TodoFolder.save(function (err) {
    //             if (err)
    //                 throw err;
    //             res.redirect('/folderListOut');
    //
    //         });
    //     })
    //     .catch(err => {
    //         return done(err)
    //     });

};