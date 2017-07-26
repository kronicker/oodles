const bcrypt = require('bcrypt');
const rounds = require('../config').database.defaultBcryptRounds;

function encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, rounds, (err, hash) => {
      return err ? reject(err) : resolve(hash);
    });
  });
}

function validate(password, oodler) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, oodler.password, function(err, res) {
      return err ? reject(err) : resolve(res);
    });
  });
}

module.exports = {
  encrypt,
  validate
};
