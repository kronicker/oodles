/**
 * Created by toma on 21.09.16..
 */
'use strict';
const seeds = require('./seeds.js');

exports.register = function (server, options, next) {

  let Thingy = require('../models/thingy');
  let Oodler = require('../models/oodler');
  let Oodlet = require('../models/oodlet');

  // Only seed if explicitly stated
  if (process.env.DB_SEED === 'true') {
    seeds();
  }

  // Only reset if explicitly stated
  if (process.env.DB_RESET === 'true') {

    Oodler.delete().run()
      .then(Oodlet.delete().run())
      .then(Thingy.delete().run())
      .done(seeds());
 }

  return next();
};

exports.register.attributes = {
  name: 'db'
};
