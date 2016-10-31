'use strict';
const Joi = require('joi');
const moment = require('moment');
const Oodlet = require('../models/oodlet');
const Oodler = require('../models/oodler');

function list(request, reply) {
  let fromDate = moment(request.query.fromDate).toDate() || moment().subtract(3, 'months').toDate();
  let toDate = moment(request.query.toDate).add(1, 'days').toDate() || moment().toDate();
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

function create(request, reply) {

  return Oodler
    .get(request.payload.oodlerId)
    .run()
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
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/oodlet',
    config: {
      handler: create,
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
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  }
];

module.exports = routes;
