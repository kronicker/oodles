'use strict';
const Oodler = require('../models/oodler');
const password = require('../util/password');

function create(request, reply) {
  if(!request.payload.email || !request.payload.password) {
    return reply({msg: 'Wrong email or password!'}).code(401);
  }

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
    }
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

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    // route.config.handler = errorHandler(route.config.handler);
    server.route(route);
  }
};