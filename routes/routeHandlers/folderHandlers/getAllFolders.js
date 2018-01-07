const findMethod = require('../../../db/commonMethods/find');


exports.get = async function (req, res, done) {

    const collectionName = "todofolders";
    const query = {ownerId: req.user._id};

    const methodSettings = {collectionName, query};


    (async function () {
        try {
            const response = await findMethod(methodSettings);
            res.status(200).send(response);
        }
        catch (err) {
            res.status(500).send(err.stack)
        }

    })()

};





// const TodoFolder = require('../../../models/user').TodoFolder;
//
// exports.get = function (req, res, done) {
//
//     TodoFolder.find({ownerId : req.user._id})
//             .exec()
//             .then((result)=>res.json(result))
//             .catch((err)=>done(err))
//
// };

