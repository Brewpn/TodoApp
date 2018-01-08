const deleteMethod = require('../../../db/commonMethods/delete'),
    ObjectID = require('mongodb').ObjectID;

exports.delete = async function (req, res, done) {

    async function deleteFolder() {
        const collectionName = "todofolders",
            query = {
                _id: ObjectID(req.body.id),
                ownerId: ObjectID(req.user._id)
            },
            methodSettings = {collectionName, query};

        (async function () {
            try {
                return await deleteMethod(methodSettings);
            }
            catch(err){
                throw new Error(err)
            }
        })()

    }

    async function deleteAllToDoInFolder() {
        const collectionName = "todos",
            query = {
                folderId: ObjectID(req.body.id),
                ownerId: ObjectID(req.user._id)
            },
            methodSettings = {collectionName, query, deleteMany: true};

        (async function () {
            try {
                return await deleteMethod(methodSettings);
            }
            catch(err){
                throw new Error(err)
            }
        })()

    }

    try {
        let result = await Promise.all([deleteFolder(), deleteAllToDoInFolder()]);
        res.status(200).send(result);
    }
    catch (err){
        res.status(500).send(`error!`)
    }
};

