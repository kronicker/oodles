'use strict';
const Joi = require('joi');
const Thingy = require('../models/thingy');

function list(request, reply) {
  let limit = request.query.limit || 50;
  let offset = request.query.offset || 0;

  return Thingy.skip(Number(offset))
    .limit(Number(limit))
    .then(result => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  Thingy.get(request.params.id)
    .then(result => reply(result).code(200));
}

function create(request, reply) {
  Thingy.save(request.payload)
    .then(result => reply(result).code(201));
}

function update(request, reply) {
  return Thingy.get(request.params.id)
    .update({
      name: request.payload.name,
      unit: request.payload.unit,
      pictureUrl: request.payload.pictureUrl
    })
    .then(result => {
      reply(result).code(200);
    });
}

function remove(request, reply) {
  return Thingy.get(request.params.id)
    .delete()
    .then(result => {
      reply(result).code(200);
    });
}

let routes = [
  {
    method: 'GET',
    path: '/thingy',
    config: {
      handler: list,
      auth: {
        scope: ['admin', 'user']
      },
      validate: {
        query: {
          limit: Joi.number(),
          offset: Joi.number()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/thingy/{id}',
    config: {
      handler: get,
      auth: {
        scope: ['admin', 'user']
      },
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
