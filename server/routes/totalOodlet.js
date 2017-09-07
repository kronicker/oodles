/**
 * Created by toma on 08.11.16..
 */
'use strict';
const Joi = require('joi');
const moment = require('moment');
const TotalOodlet = require('../models/totalOodlet');
const Oodler = require('../models/oodler');
const Oodlet = require('../models/oodlet');

function list(request, reply) {
  let fromDate = (() => { return request.query.fromDate ? moment(request.query.fromDate).toDate() : moment().subtract(3, 'months').toDate(); })();
  let toDate = (() => { return request.query.fromDate ? moment(request.query.toDate).add(1, 'days').toDate() : moment().toDate(); })();

  return TotalOodlet
    .between(fromDate, toDate, { index : 'orderedAt' })
    .filter(row => row.hasFields('orderedAt'))
    .then(result => reply(result).code(200));
}

function get(request, reply) {
  TotalOodlet.get(request.params.id)
    .then(result => reply(result).code(200));
}

function create(request, reply) {
  Oodler.get(request.payload.oodlerId)
    .then(oodler => TotalOodlet.save({ oodler }))
    .then(result => reply(result).code(201));
}

function getActive(request, reply) {
  TotalOodlet.findActive()
    .then(oodlets => {
      if (oodlets.length) {
        return reply(oodlets[0]).code(200);
      }

      return Oodler.get(request.query.oodlerId);
    })
    .then(oodler => TotalOodlet.save({ oodler }))
    .then(result => reply(result).code(201));
}

function update(request, reply) {
  return TotalOodlet
    .get(request.params.id)
    .update({
      updatedAt: new Date(),
      quantifiedThingies: request.payload.quantifiedThingies,
      oodletIds: request.payload.oodletIds
    })
    .then(result => {
      reply(result).code(200);
    });
}

function finalize(request, reply) {
  return TotalOodlet.finalize(request.params.id)
    .then(result => reply(result).code(200));
}

function remove(request, reply) {
  return TotalOodlet
    .get(request.params.id)
    .delete()
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
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/totalOodlet/active',
    config: {
      handler: getActive,
      validate: {
        query: {
          oodlerId: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/totalOodlet',
    config: {
      handler: create,
      validate: {
        payload: {
          oodlerId: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/totalOodlet/{id}',
    config: {
      handler: finalize,
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/totalOodlet/{id}',
    config: {
      handler: update,
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          quantifiedThingies: Joi.array().items(Joi.object({
            id: Joi.string(),
            name: Joi.string().min(1),
            unit: Joi.string(),
            pictureUrl: Joi.string().uri(),
            qty: Joi.number().min(1)
          }).required()),
          oodletIds: Joi.array().items(Joi.string()).required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/totalOodlet/{id}',
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
