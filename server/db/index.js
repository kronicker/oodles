/**
 * Created by toma on 21.09.16..
 */
'use strict';
const seeds = require('./seeds.js');

exports.register = function (server, options, next) {

  require('../models/thingy');
  require('../models/oodler');
  require('../models/oodlet');

  // Only seed if explicitly stated
  if (process.env.DB_SEED === 'true'){
    console.log('Started seeding!');
    seeds();
  }

  // Only reset if explicitly stated
  if (process.env.DB_RESET === 'true'){
    // TODO: IMPLEMENT ME, I DON'T WORK
    //
    // thinky.dbDrop('oodles').run(function() {
    //   seeds();
    // });
 }

  return next();
};

exports.register.attributes = {
  name: 'db'
};
