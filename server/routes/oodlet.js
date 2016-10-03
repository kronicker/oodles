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
  let oodletId = request.params.id;
  
  return Oodlet.get(oodletId)
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function create(request, reply) {
  return Oodlet({
    createdAt: request.payload.createdAt,
    updatedAt: request.payload.updatedAt,
    dueDate: request.payload.dueDate,
    oodler: request.payload.oodler,
    quantifiedThingies: request.payload.quantifiedThingies
    })
    .save()
    .then((result) => {
      reply(result).code(201);
    });
}

function update(request, reply) {
  let oodletId = request.params.id;
  
  return Oodlet.get(oodletId)
    .update(Oodlet({
      createdAt: request.payload.createdAt,
      updatedAt: request.payload.updatedAt,
      dueDate: request.payload.dueDate,
      oodler: request.payload.oodler,
      quantifiedThingies: request.payload.quantifiedThingies
    }))
    .run()
    .then((result) => {
      reply(result).code(200);
    });
}

function remove(request, reply) {
  let oodletId = request.params.id;
  
  return Oodlet.get(oodletId)
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

module.exports = function (server) {
  server.route(routes);
};
