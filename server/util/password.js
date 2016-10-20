/**
 * Created by toma on 19.10.16..
 */
const bcrypt = require('bcrypt');

function encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
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