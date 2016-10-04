'use strict';

const Thingy = require('../models/thingy');

function list(request, reply) {
  let limit = request.query.limit || 50;
  let offset = request.query.offset || 0;

  return Thingy.skip(parseInt(offset))
    .limit(parseInt(limit))
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  return Thingy.get(request.params.id)
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function create(request, reply) {
  return Thingy({
      name: request.payload.name,
      price: request.payload.price,
      unit: request.payload.unit,
      pictureUrl: request.payload.pictureUrl
    })
    .save()
    .then((result) => {
      reply(result).code(201);
    });
}

function update(request, reply) {
  return Thingy.get(request.params.id)
    .update({
      name: request.payload.name,
      price: request.payload.price,
      unit: request.payload.unit,
      pictureUrl: request.payload.pictureUrl
    })
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function remove(request, reply) {
  return Thingy.get(request.params.id)
    .delete()
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

let routes = [
  {
    method: 'GET',
    path: '/thingy',
    handler: list
  },
  {
    method: 'GET',
    path: '/thingy/{id}',
    handler: get
  },
  {
    method: 'POST',
    path: '/thingy',
    handler: create
  },
  {
    method: 'PUT',
    path: '/thingy/{id}',
    handler: update
  },
  {
    method: 'DELETE',
    path: '/thingy/{id}',
    handler: remove
  }
];

module.exports = function (server, errorHandler) {
  for (let route of routes) {
    route.handler = errorHandler(route.handler);
    server.route(route);
  }
};
