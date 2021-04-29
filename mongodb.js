// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.error(`Error connecting DB with error ${error}`);
  }

  const db = client.db(databaseName);

  // insert one is to insert one record

  //   db.collection('users').insertOne({
  //     name: 'Vaibhav',
  //     age: 32
  //   });

  db.collection('tasks').insertMany(
    [
      {
        description: 'My First Task',
        completed: true
      },
      {
        description: 'My Second Task',
        completed: false
      }
    ],
    (error, result) => {
      if (error) {
        return console.log(error);
      }
      console.log(result.ops);
    }
  );
});
