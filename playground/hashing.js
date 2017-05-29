const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});
var hashedPassword = '$2a$10$RBr0V2qZ5J2/8Ax/y4fT8.vgADIBVvDI9Azijka2wA1xRZWVJ9lzW';

bcrypt.compare('123abc', hashedPassword, (err,res) => {
  console.log(res);
});

// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);


// var message = 'aabbcc';
// var hash = SHA256(message).toString();
//
// console.log(`${message} => ${hash}`);

// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secretforhash').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'secretforhash').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data integrity');
// }
// else {
//   console.log('Data corrupted');
// }
