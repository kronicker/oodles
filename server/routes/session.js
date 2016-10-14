'use strict';
const Oodler = require('../models/oodler');
const bcrypt = require('bcrypt');

function validatePassword(password, oodler) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, oodler.password, function(err, res) {
      return err ? resolve(res) : reject(err);
    });
  });
}

function create(request, reply) {
  return Oodler
    .filter({ email: request.payload.email})
    .then(oodlers => {
      let oodler = oodlers[0];

      if(!oodler) {
        return reply('Wrong email or password!').code(401);
      }

      validatePassword(request.payload.email, oodler)
        .then(result => {
          if(result) {
            request.cookieAuth.set(oodler);
            return reply('Cookie set!').code(200);
          }
          return reply('Wrong email or password!').code(401);
        });
      
    });
}

function destroy(request, reply) {

}


let routes = [
  {
    method: 'POST',
    path: '/session/create',
    config: {
      handler: create
    }
  },
  {
    method: 'POST',
    path: '/session/destroy',
    config: {
      handler: destroy
    }
  },
];

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    route.handler = errorHandler(route.handler);
    server.route(route);
  }
};
