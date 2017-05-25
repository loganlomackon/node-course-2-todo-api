const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    //mongoose: custom validators
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//Override toJSON response
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObj = new user.toObject();

  return _.pick(userObj, ['_id', 'email']);
};

//Instance methods
UserSchema.methods.generateAuthToken = function () {
  var user = this; //To user this, you need to declare as "function" instead of arrow function
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('Users', UserSchema);

module.exports = {User};

// var newUser = new User({
//   email: 'logan.lo@pymlo.com'
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });
