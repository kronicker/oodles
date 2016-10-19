'use strict';
const Oodler = require('../models/oodler');
const token = require('../util/token');
const password = require('../util/password');
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

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
}

function savePassword(userId, hash) {
  return Oodler
    .get(userId)
    .update({ password: hash })
    .run();
}

function generateToken(request, reply) {
  let email = request.payload.email;

  return Oodler
    .filter({'email': email})
    .run()
    .then(result => {
      token.create(result[0].id)
        .then(result => {
          sendResetEmail(result, email);
          reply().code(200);
        });
    });
}

function update(request, reply) {
  return password.encrypt(request.payload.password)
    .then(hash => savePassword(request.pre.userId, hash))
    .then(reply('Password updated!').code(200));
}

function validateRequest(request, reply) {
  token.validate(request.payload.value)
    .then(token => {
        if(request.payload.password !== request.payload.passwordRepeat) {
          return Promise.reject({ msg: 'Passwords do not match' });
        }

        return Promise.resolve(token);
    })
    .then(token => {
      let userId = token.userId;
      token.delete();

      return reply(userId);
    })
    .catch(result => {
      let respond = () => reply(result.msg).code(400).takeover();

      result.token ? result.token.delete().then(respond()) : respond();
    });
}

let routes = [
  {
    method: 'POST',
    path: '/password/reset',
    config: {
      handler: generateToken
    }
  },
  {
    method: 'PUT',
    path: '/password/update',
    config: {
      pre: [{ method: validateRequest, assign: 'userId' }],
      handler: update
    }
  }
];

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    route.config.handler = errorHandler(route.config.handler);
    server.route(route);
  }
};