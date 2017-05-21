const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  //NodeJs mongodb driver api
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5921a7e80f56c7eb2c12df0a')
  // }, {//mongodb nodejs findOneAndUpdate update operations
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5921af2b0f56c7eb2c12e28d')
  }, {
    $set: {
      name: 'My wife Jazz'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });


  //db.close();
});
