'use strict';
const Oodler = require('../models/oodler');
const Token = require('../models/token');
const moment = require('moment');
const crypto = require('crypto');

// function getRandString () {
//   require('crypto').randomBytes(60, function(err, buffer) {
//     return buffer.toString('hex');
//   });
// }

function sendResetEmail (token) {
  console.log('Saljem mail sa tokenom:');
  console.log(token);
}

function generateToken(request, reply) {

  return Oodler
    .filter({'email': request.payload.email})
    .run()
    .then(result => {
      return Token ({
        value: crypto.randomBytes(64).toString('hex'),
        expiresAt: moment().add(2, 'hours').toDate(),
        userId: result[0].id
        })
        .save()
        .then(result => {
          sendResetEmail(result);
          reply().code(200);
        });
    });
}

function update(request, reply) {
  
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