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

function getOodler(oodlerId) {
  return Oodler
    .get(oodlerId)
    .run();
}

function createTotalOodlet(oodler) {
  return TotalOodlet({
      oodler: oodler
    })
    .save();
}

function list(request, reply) {
  let fromDate = (() => { return request.params.fromDate ? moment(request.params.fromDate).toDate() : moment().subtract(3, 'months').toDate(); })();
  let toDate = (() => { return request.params.fromDate ? moment(request.params.toDate).add(1, 'days').toDate() : moment().toDate(); })();
  
  return TotalOodlet
    .filter(function (row) {
      return row.hasFields('orderedAt');
    })
    .between(fromDate, toDate, { index : 'orderedAt' })
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function get(request, reply) {
  return TotalOodlet
    .get(request.query.id)
    .run()
    .then(result => {
      reply(result).code(200);
    });
}

function create(request, reply) {
  getOodler(request.payload.oodlerId)
    .then(oodler => {
      createTotalOodlet(oodler)
        .then(result => {
          reply(result).code(201);
        });
    });
}

function getActive(request, reply) {
  return TotalOodlet
    .filter(function (row) {
      return row.hasFields('orderedAt').not();
    })
    .run()
    .then((activeOodlets) => {
      if(activeOodlets[0]) {
        reply(activeOodlets[0]).code(200);
      }
      else {
        getOodler(request.query.oodlerId)
          .then(oodler => {
            createTotalOodlet(oodler)
              .then(result => {
                reply(result).code(201);
              });
          });
      }
    });
}

function update(request, reply) {
  return TotalOodlet
    .get(request.query.id)
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
    .get(request.query.id)
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
    .get(request.query.id)
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
        access: {
          scope: 'admin'
        }
      },
      validate: {
        params: {
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
        access: {
          scope: 'admin'
        }
      },
      validate: {
        query: {
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
      auth: {
        access: {
          scope: 'admin'
        }
      },
      validate: {
        params: {
          oodlerId: Joi.string()
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
        access: {
          scope: 'admin'
        }
      },
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
      auth: {
        access: {
          scope: 'admin'
        }
      },
      validate: {
        query: {
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
      auth: {
        access: {
          scope: 'admin'
        }
      },
      validate: {
        query: {
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
        access: {
          scope: 'admin'
        }
      },
      validate: {
        query: {
          id: Joi.string().required()
        }
      }
    }
  }
];

module.exports = routes;
