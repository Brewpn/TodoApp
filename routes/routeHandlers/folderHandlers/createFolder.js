const createMethod = require('../../../db/commonMethods/create');
ObjectID = require('mongodb').ObjectID;

exports.post = async function (req, res, done) {

    const collectionName = "todofolders";
    const {
        title = `${req.user.google.name}'s folder`,
        priority = `low`,
    } = req.body;

    const query = {
        ownerId: ObjectID(req.user._id),
        title,
        params: {
            priority
        }
    };

    const methodSettings = {collectionName, query};


    (async function () {
        try {
            const response = await createMethod(methodSettings);
            res.status(200).send(response);
        }
        catch (err) {
            res.status(500).send(err.stack)
        }

    })()

};
