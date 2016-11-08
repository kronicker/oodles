/**
 * Created by toma on 08.11.16..
 */
'use strict';
const Joi = require('joi');
const moment = require('moment');
const Oodlet = require('../models/oodlet');
const TotalOodlet = require('../models/totalOodlet');
const Oodler = require('../models/oodler');

function* finalizeOrderedOodlets(oodlets) {
  for(let oodlet of oodlets) {
    yield Oodlet
      .get(oodlet.id)
      .update({
          orderedAt: new Date()
        })
      .run();
  }
}

function list(request, reply) {
  let fromDate = (() => { return request.query.fromDate ? moment(request.query.fromDate).toDate() : moment().subtract(3, 'months').toDate(); })();
  let toDate = (() => { return request.query.fromDate ? moment(request.query.toDate).add(1, 'days').toDate() : moment().toDate(); })();
  
  return TotalOodlet
    .between(fromDate, toDate, { index : 'orderedAt' })
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  return TotalOodlet
    .get(request.params.id)
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function create(request, reply) {
  return Oodler
    .get(request.payload.oodlerId)
    .run()
    .then(oodler => {
      return TotalOodlet({
          oodler: oodler,
          quantifiedThingies: request.payload.quantifiedThingies,
          orderedOodlets: request.payload.orderedOodlets
        })
        .save()
        .then(result => {
          reply(result).code(201);
        });
    });
}

function update(request, reply) {
  return TotalOodlet
    .get(request.params.id)
    .update({
      updatedAt: new Date(),
      quantifiedThingies: request.payload.quantifiedThingies,
      orderedOodlets: request.payload.orderedOodlets
    })
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function finalize(request, reply) {
  return TotalOodlet
    .get(request.params.id)
    .update({
      orderedAt: new Date()
    },
    { returnChanges: true })
    .run()
    .then(result => {
      Promise.all(finalizeOrderedOodlets(result.orderedOodlets))
        .then(() => {
          reply(result).code(200);
        });
    });
}

function remove(request, reply) {
  return TotalOodlet
    .get(request.params.id)
    .delete()
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

let routes = [
  {
    method: 'GET',
    path: '/totalOodlet',
    config: {
      handler: list,
      auth: {
        scope: 'admin'
      },
      validate: {
        query: {
          toDate: Joi.date(),
          fromDate: Joi.date()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/totalOodlet/{id}',
    config: {
      handler: get,
      auth: {
        scope: 'admin'
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
    path: '/totalOodlet',
    config: {
      handler: create,
      auth: {
        scope: 'admin'
      },
      validate: {
        payload: {
          oodlerId: Joi.string().required(),
          quantifiedThingies: Joi.array(Joi.object({
            id: Joi.string(),
            name: Joi.string().min(1),
            unit: Joi.string(),
            pictureUrl: Joi.string().uri(),
            qty: Joi.number().min(1)
          })),
          orderedOodlets: Joi.array(Joi.object())
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/totalOodlet/{id}',
    config: {
      handler: finalize,
      auth: {
        scope: 'admin'
      },
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          oodlerId: Joi.string(),
          quantifiedThingies: Joi.array(Joi.object({
            id: Joi.string(),
            name: Joi.string().min(1),
            unit: Joi.string(),
            pictureUrl: Joi.string().uri(),
            qty: Joi.number().min(1)
          })),
          orderedOodlets: Joi.array(Joi.object())
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/totalOodlet/{id}',
    config: {
      handler: update,
      auth: {
        scope: 'admin'
      },
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          quantifiedThingies: Joi.array(Joi.object({
            id: Joi.string(),
            name: Joi.string().min(1),
            unit: Joi.string(),
            pictureUrl: Joi.string().uri(),
            qty: Joi.number().min(1)
          }).required()),
          orderedOodlets: Joi.array(Joi.object()).required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/totalOodlet/{id}',
    config: {
      handler: remove,
      auth: {
        scope: 'admin'
      },
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  }
];

module.exports = routes;
