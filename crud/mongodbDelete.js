const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log(error);
  }
  const db = client.db(databaseName);

  db.collection('tasks')
    .deleteMany({ completed: true })
    .then(result => {
      console.log(result.deletedCount);
    })
    .catch(error => console.error(error));
});
