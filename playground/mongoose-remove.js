const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo')
const {User} = require('./../server/models/User');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });
// 
// Todo.findOneAndRemove({ _id:'5922a9380f56c7eb2c130b56'}).then((todo) => {
//   console.log(todo);
// });


Todo.findByIdAndRemove('5922a9380f56c7eb2c130b56').then((todo) => {
  console.log(todo);
});
