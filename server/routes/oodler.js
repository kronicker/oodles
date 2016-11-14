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
  return Oodler
    .filter({ email: request.payload.email})
    .run()
    .then(oodlers => {
      if(oodlers[0]) {
        reply('User already registered with this email').code(400);
      }

    return Oodler({
      firstName: request.payload.firstName,
      lastName: request.payload.lastName,
      email: request.payload.email,
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

  return Oodler
    .filter({ email: request.payload.email})
    .run()
    .then(oodlers => {
      //Check if email in the payload exists in database and if it is registered for another user
      //TODO: Check if there is a better implementation
      if (oodlers[0] && oodlers[0].id !== oodlerId) {
        return reply('User already registered with this email').code(400);
      }

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
    config: {
      handler: list,
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
    path: '/oodler/{id}',
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
    path: '/oodler',
    config: {
      handler: create,
      auth: {
        scope: ['admin', 'user']
      },
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
      auth: {
        scope: ['admin', 'user']
      },
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

module.exports = routes;

