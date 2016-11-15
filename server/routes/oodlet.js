'use strict';
const Joi = require('joi');
const moment = require('moment');
const Oodlet = require('../models/oodlet');
const oodlerUtil = require('../util/oodler');
const oodletUtil = require('../util/oodlet');

function list(request, reply) {
  let fromDate = (() => { return request.query.fromDate ? moment(request.query.fromDate).toDate() : moment().subtract(3, 'months').toDate(); })();
  let toDate = (() => { return request.query.fromDate ? moment(request.query.toDate).add(1, 'days').toDate() : moment().toDate(); })();
  let office = request.query.office;

  return Oodlet
    .between(fromDate, toDate, { index : 'dueDate' })
    .filter({ oodler: { office: office} })
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  return Oodlet
    .get(request.params.id)
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function active(request, reply) {
  oodletUtil.findActive(request.query.office)
    .then(activeOodlets => {
      if (activeOodlets.length) {
        reply(activeOodlets[0]).code(200);
      }
      else {
        Promise.all([
          oodlerUtil.get(request.query.oodlerId),
          oodletUtil.nextDueDate()
        ])
        .then(([oodler, dueDate]) => oodletUtil.create(oodler, dueDate))
        .then(result => reply(result).code(201));
      }
    });
}

function pending(request, reply) {
  reply(oodletUtil.findPending()).code(200);
}

function create(request, reply) {
  oodlerUtil.get(request.payload.oodlerId)
    .then(oodler => {
      return Oodlet({
        oodler: oodler,
        quantifiedThingies: request.payload.quantifiedThingies
      })
        .save()
        .then(result => {
          reply(result).code(201);
        });
    });
}

function update(request, reply) {
  return Oodlet
    .get(request.params.id)
    .update({
      updatedAt: new Date(),
      quantifiedThingies: request.payload.quantifiedThingies
    })
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function remove(request, reply) {
  return Oodlet
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
    path: '/oodlet',
    config: {
      handler: list,
      auth: {
        scope: ['admin', 'user']
      },
      validate: {
        query: {
          office: Joi.string().required(),
          toDate: Joi.date(),
          fromDate: Joi.date()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/oodlet/{id}',
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
    method: 'GET',
    path: '/oodlet/active',
    config: {
      handler: active,
      auth: {
        scope: ['user']
      },
      validate: {
        query: {
          oodlerId: Joi.string().required(),
          office: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/oodlet/pending',
    config: {
      handler: pending
    }
  },
  {
    method: 'POST',
    path: '/oodlet',
    config: {
      handler: create,
      auth: {
        scope: ['admin', 'user']
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
          }))
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/oodlet/{id}',
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
          quantifiedThingies: Joi.array(Joi.object({
            id: Joi.string(),
            name: Joi.string().min(1),
            unit: Joi.string(),
            pictureUrl: Joi.string().uri(),
            qty: Joi.number().min(1)
          }).required())
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/oodlet/{id}',
    config: {
      handler: remove,
      auth: {
        scope: ['admin', 'user']
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
