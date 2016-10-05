/**
 * Created by toma on 23.09.16..
 */
'use strict';

const Oodlet = require('../models/oodlet');

function list(request, reply) {
  let limit = request.query.limit || 5;
  let offset = request.query.offset || 0;

  return Oodlet
    .skip(parseInt(offset))
    .limit(parseInt(limit))
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  return Oodlet.get(request.params.id)
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function create(request, reply) {
  return Oodlet({
    oodler: request.payload.oodler,
    quantifiedThingies: request.payload.quantifiedThingies
    })
    .save()
    .then((result) => {
      reply(result).code(201);
    });
}

function update(request, reply) {
  return Oodlet.get(request.params.id)
    .update({
      updatedAt: new Date(),
      quantifiedThingies: request.payload.quantifiedThingies
    })
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function remove(request, reply) {
  return Oodlet.get(request.params.id)
    .delete()
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

let routes = [
  {
    method: 'GET',
    path: '/oodlet',
    handler: list
  },
  {
    method: 'GET',
    path: '/oodlet/{id}',
    handler: get
  },
  {
    method: 'POST',
    path: '/oodlet',
    handler: create
  },
  {
    method: 'PUT',
    path: '/oodlet/{id}',
    handler: update
  },
  {
    method: 'DELETE',
    path: '/oodlet/{id}',
    handler: remove
  }
];

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    route.handler = errorHandler(route.handler);
    server.route(route);
  }
};
