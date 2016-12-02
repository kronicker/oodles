/**
 * Created by toma on 02.12.16..
 */
'use strict';
const Joi = require('joi');
const SuggestedThingy = require('../models/suggestedThingy');
const suggestedThingyUtil = require('../util/suggestedThingy');
const thingyUtil = require('../util/thingy');

function list(request, reply) {
  let limit = request.query.limit || 50;
  let offset = request.query.offset || 0;
  
  return SuggestedThingy.skip(parseInt(offset))
    .limit(parseInt(limit))
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  return SuggestedThingy.get(request.params.id)
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function create(request, reply) {
  thingyUtil.filterByName(request.payload.name)
    .then(thingies => {
      if(thingies[0]) { return reply(thingies[0]).code(400); }
      
      return SuggestedThingy({
        name: request.payload.name,
        unit: request.payload.unit,
        pictureUrl: request.payload.pictureUrl,
        suggestedBy: request.payload.oodler
      })
        .save()
        .then(result => {
          reply(result).code(201);
        });
      
    });
}

function update(request, reply) {
  return SuggestedThingy.get(request.params.id)
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

function save(request, reply) {
  suggestedThingyUtil.remove(request.params.id)
    .then(() => thingyUtil.save(request.payload.name, request.payload.unit, request.payload.pictureUrl))
    .then(thingy => reply(thingy).code(201));
}

function remove(request, reply) {
  suggestedThingyUtil.remove(request.params.id)
    .then(result => reply(result).code(200));
}

let routes = [
  {
    method: 'GET',
    path: '/suggestedThingy',
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
    path: '/suggestedThingy/{id}',
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
    path: '/suggestedThingy',
    config: {
      handler: create,
      auth: {
        scope: ['user']
      },
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
    path: '/suggestedThingy/{id}',
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
    method: 'POST',
    path: '/suggestedThingy/{id}',
    config: {
      handler: save,
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
    path: '/suggestedThingy/{id}',
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
