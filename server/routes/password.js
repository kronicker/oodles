'use strict';
const Oodler = require('../models/oodler');
const token = require('../util/token');
const password = require('../util/password');
const mail = require('../util/mail');

function savePassword(userId, hash) {
  return Oodler
    .get(userId)
    .update({ password: hash }, {returnChanges: true})
    .run();
}

function generateToken(request, reply) {
  if(!request.payload.email) {
    return reply().code(401);
  }
  let email = request.payload.email;
  console.log(email);

  return Oodler
    .filter({'email': email})
    .run()
    .then(result => {
      token.create(result[0].id)
        .then(result => {
          mail.sendReset(result, email);
          reply().code(200);
        });
    });
}

function update(request, reply) {
  return password.encrypt(request.payload.password)
    .then(hash => savePassword(request.pre.userId, hash))
    .then((result) => {
      let oodler = result;
      delete oodler.password;
      reply(oodler).code(200);
    });
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
      auth: false,
      handler: generateToken
    }
  },
  {
    method: 'PUT',
    path: '/password/update',
    config: {
      auth: false,
      pre: [{ method: validateRequest, assign: 'userId' }],
      handler: update
    }
  }
];

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    // route.config.handler = errorHandler(route.config.handler);
    server.route(route);
  }
};