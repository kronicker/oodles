'use strict';
const Joi = require('joi');
const password = require('../util/password');
const Oodler = require('../models/oodler');

function create(request, reply) {

  return Oodler
    .filter({ email: request.payload.email})
    .then(oodlers => {
      let oodler = oodlers[0];

      if(!oodler) {
        return reply({msg: 'Wrong email or password!'}).code(401);
      }

      return password.validate(request.payload.password, oodler)
        .then(valid => {
          if(valid) {
            delete oodler.password;
            request.cookieAuth.set(oodler);
            return reply(oodler).code(200);
          }
          return reply({msg: 'Wrong email or password!'}).code(401);
        });
    });
}

function get(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply(request.auth.credentials).code(200);
  }
  else {
    return reply('No cookie set!').code(401);
  }
}

function destroy(request, reply) {
  request.cookieAuth.clear();
  return reply('Cookie deleted').code(200);
}


let routes = [
  {
    method: 'GET',
    path: '/session',
    config: {
      auth: {
        strategy: 'session',
        scope: ['user', 'admin']
      },
      handler: get
    }
  },
  {
    method: 'POST',
    path: '/session/create',
    config: {
      auth: false,
      handler: create,
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(6).max(200).required()
        }
      }
    },
  },
  {
    method: 'DELETE',
    path: '/session/destroy',
    config: {
      auth: {
        strategy: 'session',
        scope: ['user', 'admin']
      },
      handler: destroy
    }
  },
];

module.exports = routes;

