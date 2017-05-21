const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo')
const {User} = require('./../server/models/User');

// var id = '921caf0cd8fdd1420a30a14';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID is invalid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo find One', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

var id = '5921b84659d27b1188ab3b24';
User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User by ID', user);
}).catch((e) => console.log(e));
