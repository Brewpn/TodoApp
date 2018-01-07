const MongoClient = require('mongodb').MongoClient;



let _connection;

const connect = () => {

    if (!process.env.uri) {
        throw new Error(`Environment variable URI must be set to use API.`);
    }

    return (MongoClient.connect)(process.env.uri);

};

const connection = () => {
    if (!_connection) {
        _connection = connect();
    }
    return _connection;
};

async function getCollection(collectionName) {
    const db = await connection();
    return db.collection(collectionName);
}

module.exports = getCollection;