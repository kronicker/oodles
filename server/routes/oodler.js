'use strict';
const Joi = require('joi');
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
  return Oodler({
    firstName: request.payload.firstName,
    lastName: request.payload.lastName,
    email: request.payload.email,
    office: request.payload.office,
    scope: request.payload.scope
    })
    .save()
    .then(result => {
      reply(result).code(201);
    });
}

function update(request, reply) {
  let oodlerId = request.params.id;

  return Oodler.get(oodlerId)
    .update({
      firstName: request.payload.firstName,
      lastName: request.payload.lastName,
      email: request.payload.email,
      office: request.payload.office,
      scope: request.payload.scope
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
    config: {
      handler: get,
      validate: {
        params: {
          id: Joi.string().token()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/oodler',
    config: {
      handler: create,
      validate: {
        payload: {
          firstName: Joi.string().alphanum().required(),
          lastName: Joi.string().alphanum().required(),
          email: Joi.string().email().required(),
          office: Joi.string().required(),
          scope: Joi.string().valid('user', 'admin').required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/oodler/{id}',
    config: {
      handler: update,
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          firstName: Joi.string().alphanum().required(),
          lastName: Joi.string().alphanum().required(),
          email: Joi.string().email().required(),
          office: Joi.string().required(),
          scope: Joi.string().valid('user', 'admin').required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/oodler/{id}',
    config: {
      handler: remove,
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  }
];

module.exports = function(server, errorHandler) {
  for (let route of routes) {
    // route.handler = errorHandler(route.handler);
    server.route(route);
  }
};
