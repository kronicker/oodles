'use strict';
const Oodler = require('../models/oodler');
const bcrypt = require('bcrypt');

function validatePassword(password, oodler) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, oodler.password, function(err, res) {
      return err ? reject(err) : resolve(res);
    });
  });
}

function create(request, reply) {
  return Oodler
    .filter({ email: request.payload.email})
    .then(oodlers => {
      let oodler = oodlers[0];

      if(!oodler) {
        return reply({msg: 'Wrong email or password!'}).code(401);
      }

      return validatePassword(request.payload.password, oodler)
        .then(result => {
          if(result) {
            request.cookieAuth.set({id: oodler.id, scope: oodler.scope});
            return reply('Cookie set!').code(200);
          }
          return reply({msg: 'Wrong email or password!'}).code(401);
        });
    });
}

function destroy(request, reply) {
  request.cookieAuth.clear();
  return reply('Cookie deleted').code(200);
}


let routes = [
  {
    method: 'POST',
    path: '/session/create',
    config: {
      auth: false,
      handler: create,
    }
  },
  {
    method: 'GET',
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
    route.config.handler = errorHandler(route.config.handler);
    server.route(route);
  }
};
