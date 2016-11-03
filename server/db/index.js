/**
 * Created by toma on 21.09.16..
 */
'use strict';
const glob = require('glob');
const path = require('path');
const seeds = require('./seeds.js');
const models = glob.sync('./server/models/*');


exports.register = function (server, options, next) {

  // Only seed if explicitly stated
  if (process.env.DB_SEED === 'true') {
    seeds();
  }

  // Only reset if explicitly stated
  if (process.env.DB_RESET === 'true') {

  Promise.all(function* () {
      for(let model of models) {
        yield require(path.resolve(model)).delete().run();
      }
    }())
    .then(seeds());
 }

  return next();
};

exports.register.attributes = {
  name: 'db'
};
