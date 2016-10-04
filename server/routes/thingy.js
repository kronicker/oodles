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
  let thingyId = request.params.id;

  return Thingy.get(thingyId)
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
      return reply(result).code(201);
    });
}

function update(request, reply) {
  let thingyId = request.params.id;

  return Thingy.get(thingyId)
    .update(Thingy({
      name: request.payload.name,
      price: request.payload.price,
      unit: request.payload.unit,
      pictureUrl: request.payload.pictureUrl
    }))
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function remove(request, reply) {
  let thingyId = request.params.id;

  return Thingy.get(thingyId)
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
