const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.error(error);
  }

  const db = client.db(databaseName);

  db.collection('users')
    .updateMany({ age: { $gt: 25 } }, { $inc: { age: 1 } })
    .then(result => console.log(result.modifiedCount))
    .catch(error => console.log(error));
});
