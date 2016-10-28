'use strict';
const Oodler = require('../models/oodler');

function list(request, reply) {
  let limit = request.query.limit || 20;
  let offset = request.query.offset || 0;

  return Oodler.skip(parseInt(offset))
    .limit(parseInt(limit))
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  return Oodler.get(request.params.id)
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function create(request, reply) {
  return Oodler
    .filter({ email: request.payload.email})
    .run()
    .then(exists => {
      if(exists) {
        reply('User already registered with this email').code(400);
      }

    return Oodler({
      firstName: request.payload.firstName,
      lastName: request.payload.lastName,
      email: request.payload.email,
      password: request.payload.password,
      office: request.payload.office,
      scope: request.payload.office
      })
      .save()
      .then(result => {
        reply(result).code(201);
      });
    });
}

function update(request, reply) {
  let oodlerId = request.params.id;

  return Oodler.get(oodlerId)
    .update({
      firstName: request.payload.firstName,
      lastName: request.payload.lastName,
      email: request.payload.email,
      password: request.payload.password,
      office: request.payload.office,
      scope: request.payload.office
    })
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function remove(request, reply) {
  return Oodler.get(request.params.id)
    .delete()
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

let routes = [
  {
    method: 'GET',
    path: '/oodler',
    handler: list
  },
  {
    method: 'GET',
    path: '/oodler/{id}',
    handler: get
  },
  {
    method: 'POST',
    path: '/oodler',
    handler: create
  },
  {
    method: 'PUT',
    path: '/oodler/{id}',
    handler: update
  },
  {
    method: 'DELETE',
    path: '/oodler/{id}',
    handler: remove
  }
];

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    route.handler = errorHandler(route.handler);
    server.route(route);
  }
};
