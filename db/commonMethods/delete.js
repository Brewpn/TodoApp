const getCollection = require('../index');

async function deleteMethod({collectionName, query, deleteMany}) {

    async function remove() {

        let result;

        try {
            const collection = (await (await getCollection(collectionName)));
            if (deleteMany) {
                result = await collection.deleteMany(query)
            } else {
                result = await collection.deleteOne(query)
            }
            return await result;
        }
        catch (err) {
            throw new Error(err)
        }
    }

    return await remove();

}

module.exports = deleteMethod;