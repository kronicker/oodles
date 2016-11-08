'use strict';
const Joi = require('joi');
const moment = require('moment');
const Oodlet = require('../models/oodlet');
const Oodler = require('../models/oodler');

function getOodler(oodlerId) {
  return Oodler
    .get(oodlerId)
    .run();
}

function createNewOodlet(oodler, dueDate) {
  return Oodlet({
      oodler: oodler,
      dueDate: dueDate
    })
    .save();
}

function getNextDueDate() {
  return Oodlet
    .orderBy({index: '-dueDate'})
    .run()
    .then(oodlets => {
      let nextDate = oodlets[0].dueDate || new Date();
      while(nextDate <= new Date()) {
        nextDate = moment(nextDate).add(2, 'weeks').toDate();
      }
      return nextDate;
    });
}

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

function getActive(request, reply) {
  return Oodlet
    .filter({ oodler: { office: request.query.office} })
    .filter(function (row) {
      return row('dueDate').ge(new Date());
    })
    .run()
    .then((activeOodlets) => {
      if (activeOodlets) {
        reply(activeOodlets[0]).code(200);
      }
      else {
        getOodler(request.query.oodlerId)
          .then(oodler => {
            getNextDueDate()
              .then(dueDate => {
                createNewOodlet(oodler, dueDate)
                  .then(result => {
                    reply(result).code(201);
                  });
              });
          });
      }
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
    method: 'GET',
    path: '/oodlet/active/{oodlerId}',
    config: {
      handler: getActive,
      validate: {
        params: {
          oodlerId: Joi.string().required(),
          office: Joi.string().required()
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
