'use strict';
const Joi = require('joi');
const Oodler = require('../models/oodler');
const token = require('../util/token');
const password = require('../util/password');
const mail = require('../util/mail');

function savePassword(userId, hash) {
  return Oodler
    .get(userId)
    .update({ password: hash }, { returnChanges: true })
    .run();
}

function generateToken(request, reply) {
  if(!request.payload.email) {
    return reply({ msg: 'You must enter your email!' }).code(401);
  }
  let email = request.payload.email;

  return Oodler
    .filter({ 'email': email })
    .run()
    .then(result => {
      token.create(result[0].id)
        .then(result => {
          mail.sendReset(result, email);
          reply({ msg: 'Email sent! Please check your email!' }).code(200);
        });
    })
    .catch(() => {
      return reply({ msg: 'Something went wrong! Please try again!' }).code(401);
    });
}

function update(request, reply) {
  return password.encrypt(request.payload.password)
    .then(hash => savePassword(request.pre.userId, hash))
    .then(oodler => {
      delete oodler.password;
      request.cookieAuth.set(oodler);
      reply(oodler).code(200);
    })
    .catch(() => {
      return reply({ msg: 'Something went wrong! Please try again!' }).code(401);
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
      let respond = () => reply(result).code(400).takeover();

      result.token ? result.token.delete().then(respond()) : respond();
    });
}

let routes = [
  {
    method: 'POST',
    path: '/password/reset',
    config: {
      auth: false,
      handler: generateToken,
      validate: {
        payload: {
          email: Joi.string().email().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/password/update',
    config: {
      auth: false,
      pre: [{ method: validateRequest, assign: 'userId' }],
      handler: update,
      validate: {
        payload: {
          password: Joi.string().min(6).max(200).required(),
          passwordRepeat: Joi.string().min(6).max(200).required(),
          value: Joi.string().token()
        }
      }
    }
  }
];

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    // route.config.handler = errorHandler(route.config.handler);
    server.route(route);
  }
};