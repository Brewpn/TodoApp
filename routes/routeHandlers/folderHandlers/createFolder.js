const Folder = require('../../../models/user').TodoFolder;

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


};
