const User = require('../../models/user').User;
const async = require('async');


exports.delete = function (req, res, done) {

    const deleteFolderId = req.body._id;

    // async.waterfall([
    //     function (callback) {
    //         User.findOne({_id: req.user.id}, callback);
    //     },
    //     function (user, callback) {
    //         user.folderList.folderArray.pull({_id: deleteFolderId});
    //
    //         callback(null, user);
    //     },
    //     function (user) {
    //         user.save(function (err) {
    //             if (err)
    //                 throw err;
    //             res.redirect('/folderListOut');
    //
    //         });
    //
    //     }
    // ]);

};