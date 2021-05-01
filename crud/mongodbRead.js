const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.error(`Error connecting DB with error ${error}`);
  }

  const db = client.db(databaseName);

  // insert one is to insert one record

  //   db.collection('users').findOne({ _id: new ObjectID('60850bdf6f16491dfb52199b') }, (error, user) => {
  //     if (error) {
  //       return console.error(error);
  //     }
  //     console.log(user);
  //   });

  db.collection('tasks')
    .find({ completed: true })
    .toArray((error, tasks) => {
      console.log(tasks);
    });

  db.collection('tasks')
    .find({ completed: true })
    .count((error, count) => {
      console.log(count);
    });
});
