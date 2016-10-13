/**
 * Created by toma on 13.10.16..
 */
const Token = require('../models/token');
const moment = require('moment');
const crypto = require('crypto');

function create(userId) {
  return Token({
      value: crypto.randomBytes(64).toString('hex'),
      expiresAt: moment().add(2, 'hours').toDate(),
      userId: userId
    })
    .save();
}
function remove(tokenId) {
  return Token
    .get(tokenId)
    .delete()
    .run();
}

function validate(value) {
  return Token.filter({ value: value })
    .then(tokens => {
      let token = tokens[0];

      if(!token) {
        return Promise.reject({ msg: 'Token not found' });
      }

      if(moment(token.expiresAt).isBefore()) {
        return Promise.reject({ token: token, msg: 'Token expired' });
      }

      return token;
    });
}

module.exports = {
  create,
  remove,
  validate
};