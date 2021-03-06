const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('59219533e542c40cc7b00552')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos:', err);
  // });

  db.collection('Users').find({
    name: 'PP'
  }).count().then((count) => {
    console.log(`Count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch users:', err);
  });

  //db.close();
});
