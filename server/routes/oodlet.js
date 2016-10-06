/**
 * Created by toma on 23.09.16..
 */
'use strict';

const Oodlet = require('../models/oodlet');

function list(request, reply) {
  let fromDate = new Date(request.query.fromDate) || new Date(Date.now()-1000*60*60*24*7*20);
  let toDate = new Date(request.query.toDate) || new Date(Date.now());
  console.log(fromDate);
  console.log(toDate);

  return Oodlet
    .between(fromDate, toDate, { index : 'dueDate' })
    // .orderBy('dueDate')
    // .filter(
    //   r.row('dueDate').during(r.time(2013, 12, 1, "Z"), r.time(2013, 12, 10, "Z")))
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
