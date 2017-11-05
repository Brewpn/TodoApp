const User = require('../models/user').User;

exports.post = function (req, res, done) {

     const newFolder = req.body ;

     console.log(req.body);
     User.findOne({"google.profileId": req.user.google.profileId}, function (err, user) {
         user.folderList = newFolder;

         user.save(function (err) {
             if (err)
                 throw err;
             return done(null, user);
         });
     })
};
