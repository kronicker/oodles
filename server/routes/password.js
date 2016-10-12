'use strict';
const Oodler = require('../models/oodler');
const Token = require('../models/token');
const moment = require('moment');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const api_key = 'key-73db2b70c2c5fda574df5e2fd938504f';
const domain = 'sandbox629530a6164643d28eb2f1767607d8db.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function sendResetEmail (token, email) {
  let data = {
    from: 'Oodles <no-reply@oodles.extensionengine.com>',
    to: email,
    subject: 'Password reset',
    text: 'Please use the following link to reset your password: https://oodles.extensionengine.com/password/new?token=' +
          token.value +
          '.\nIf you did not request this password change please feel free to ignore it.' +
          '\nOodles'
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

function getToken(tokenId) {
  return Token
    .get(tokenId)
    .run();
}

function createToken(userId) {
  return Token({
      value: crypto.randomBytes(64).toString('hex'),
      expiresAt: moment().add(2, 'hours').toDate(),
      userId: userId
    })
    .save();
}

function saveOodlerPassword(userId, hash) {
  return Oodler
    .get(request.payload.token.userId)
    .update({
      password: hash
    })
    .run();
}

function generateToken(request, reply) {
  let email = request.payload.email;

  return Oodler
    .filter({'email': email})
    .run()
    .then(result => {
      createToken(result[0].id)
        .then(result => {
          sendResetEmail(result, email);
          reply().code(200);
        });
    });
}

function update(request, reply) {
  getToken(request.payload.token.id)
    .then(result => {
      if(moment(result.expiresAt).isBefore()) {
        reply('Token expired').code(400);
      }

      else if(request.payload.password !== request.payload.passwordRepeat) {
        reply('Passwords do not match').code(400);
      }

      bcrypt.hash(request.payload.password, function(err, hash) {
        saveOodlerPassword(request.payload.token.userId, hash)
          .then(result => {
            reply(result).code(200);
          });
      });
    });
}

let routes = [
  {
    method: 'POST',
    path: '/password/reset',
    handler: generateToken
  },
  {
    method: 'PUT',
    path: '/password/update',
    handler: update
  }

];

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    route.handler = errorHandler(route.handler);
    server.route(route);
  }
};