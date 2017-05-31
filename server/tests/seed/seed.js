const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/Todo');
const {User} = require('./../../models/User');

const user1Id = new ObjectID();
const user2Id = new ObjectID();

const users = [{
  _id: user1Id,
  email: 'kaniz@gmail.com',
  password: '11112222',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user1Id, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: user2Id,
  email: 'jane@gmail.com',
  password: '22223333'
}];

const todos = [{
  _id: new ObjectID(),
  text: '1st test todo'
}, {
  _id: new ObjectID(),
  text: '2nd test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  //Todo.remove({}).then(() => done());
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var user1 = new User(users[0]).save();
    var user2 = new User(users[1]).save();

    return Promise.all([user1, user2])
    //Will continue only if user1, user2 are both resolved
  }).then(() => done())
  .catch((err) => {
    console.log('Failed');
  });
};

module.exports = {todos, populateTodos, users, populateUsers};
