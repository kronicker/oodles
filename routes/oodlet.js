/**
 * Created by toma on 23.09.16..
 */
'use strict';

const Oodlet = require('../models/oodlet');
const Oodler = require('../models/oodler');
const Thingy = require('../models/thingy');

function create(request, response) {
  
  Oodler
    .sample(1)
    .run()
    .then(function getSampleOodler(result) {
      return result[0];
    })
    .then(function getSampleThingies(oodler) {
      return Thingy.sample(5).run().then((thingies) => {
        return {
          oodler: oodler,
          thingies: thingies
        };
      });
    })
    .then((composite) => {
      var oodlet = new Oodlet({
        date: request.payload.date,
        oodler: composite.oodler,
        thingies: composite.thingies,
        total: request.payload.total
      });
      
      oodlet
        .save()
        .then((result) => {
          response(result).code(201);
        })
        .catch((err) => {
          response(err.message).code(500);
        });
      
    })
    .catch((err) => {
      response(err.message).code(500);
    });
  
}

let routes = [{
  method: 'POST',
  path: '/oodlet',
  handler: create
}];

module.exports = function (server) {
  server.route(routes);
};
