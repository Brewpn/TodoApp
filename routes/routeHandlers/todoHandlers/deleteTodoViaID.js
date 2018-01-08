const deleteMethod = require('../../../db/commonMethods/delete'),
    ObjectID = require('mongodb').ObjectID;


exports.delete = async function (req, res, done) {

    const collectionName = "todos",
        query = {
            _id: ObjectID(req.body.id),
            ownerId: ObjectID(req.user.id)
        },
        methodSettings = {collectionName, query};

    (async function () {
        try{
            await deleteMethod(methodSettings);
            res.status(200).send(`todo with ${query._id} deleted successfully`);
        }
        catch (err){
            res.status(500).send(`failed to delete todo with id ${_id}`)
        }
    })()
};
