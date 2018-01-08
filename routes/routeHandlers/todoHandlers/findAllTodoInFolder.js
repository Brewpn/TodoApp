const findMethod = require('../../../db/commonMethods/find'),
    ObjectID = require('mongodb').ObjectID;

exports.get = async function (req, res, done) {

    const collectionName = "todos",

        query = {
            ownerId: ObjectID(req.user.id),
            folderId: ObjectID(req.params.id)
        },

        methodSettings = {collectionName, query};


    (async function () {
        try {
            const response = await findMethod(methodSettings);
            if (response.length !== 0) {
                res.status(200).send(response)
            } else {
                res.status(404).send(`Empty folder!`)
            }
        }
        catch (err) {
            res.status(err.statusCode).send(err.stack)
        }
    })()

};
