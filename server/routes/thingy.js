'use strict';
const Joi = require('joi');
const Thingy = require('../models/thingy');

function list(request, reply) {
  let limit = request.query.limit || 50;
  let offset = request.query.offset || 0;

  return Thingy.skip(parseInt(offset))
    .limit(parseInt(limit))
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  return Thingy.get(request.params.id)
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function create(request, reply) {
  return Thingy({
      name: request.payload.name,
      unit: request.payload.unit,
      pictureUrl: request.payload.pictureUrl
    })
    .save()
    .then(result => {
      reply(result).code(201);
    });
}

function update(request, reply) {
  return Thingy.get(request.params.id)
    .update({
      name: request.payload.name,
      unit: request.payload.unit,
      pictureUrl: request.payload.pictureUrl
    })
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function remove(request, reply) {
  return Thingy.get(request.params.id)
    .delete()
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

let routes = [
  {
    method: 'GET',
    path: '/thingy',
    config: {
      handler: list
    }
  },
  {
    method: 'GET',
    path: '/thingy/{id}',
    config: {
      handler: get,
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/thingy',
    config: {
      handler: create,
      validate: {
        payload: {
          name: Joi.string().required(),
          price: Joi.number(),
          unit: Joi.string(),
          pictureUrl: Joi.string().uri()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/thingy/{id}',
    config: {
      handler: update,
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          name: Joi.string().required(),
          price: Joi.number(),
          unit: Joi.string(),
          pictureUrl: Joi.string().uri()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/thingy/{id}',
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

module.exports = routes;
