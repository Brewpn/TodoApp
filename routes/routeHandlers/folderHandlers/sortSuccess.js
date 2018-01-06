const TodoFolder = require('../../../models/user').TodoFolder;

exports.get = function (req, res, done) {

    TodoFolder.find({
        ownerId : req.user._id,
    })
        .sort({'params.success': -1})
        .exec()
        .then((result)=>{
            res.json(result)
        })
        .catch((err)=>done(err))

};
