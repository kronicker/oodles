'use strict';

const Thingy = require('../models/thingy');

function create(request, response) {
  var thingy = new Thingy({
    name: request.payload.name,
    price: request.payload.price,
    unit: request.payload.unit,
    pictureUrl: request.payload.pictureUrl
  });

  return thingy
          .save()
          .then((result) => {
            response(result).code(201);
          })
          .catch((err) => {
            response(err.message).code(500);
          });
}

let routes = [{
  method: 'POST',
  path: '/thingy',
  handler: create
}];

module.exports = function (server) {
  server.route(routes);
};
