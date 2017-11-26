const TodoFolder = require('../../models/user').TodoFolder;

exports.delete = function (req, res, done) {

    const deleteFolderId = req.body._id;

    TodoFolder.findByIdAndRemove(deleteFolderId, (err, folder) => {
        let response = {
            message : "Folder successfully deleted"
        };
        res.status(200).send(response);
    })

};