const Folder = require('../../../models/user').TodoFolder;
const mongoose = require('mongoose');


exports.post = function (req, res, done) {


    let FolderSet = new Promise((resolve, reject) => {
        const ownerId = req.user.id;
         const   {
                title = `${req.user.google.name}'s folder`,
                priority = `low`,
            } = req.body;

        let folder = new Folder({
            ownerId,
            title,
            params: {
                priority
            }
        });
        resolve(folder)

    });

    FolderSet
        .then((folder) => {
            Folder.create(folder)
        })
        .then(()=>{
            res.status(200).redirect('.././folderListOut')
        })
        .catch((err)=>res.send(err));/*DEVELOPMENT*/



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
