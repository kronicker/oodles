/**
 * Created by toma on 21.09.16..
 */
'use strict';

exports.register = function (server, options, next) {
  
  require('../models/thingy');
  require('../models/oodler');
  require('../models/oodlet');
  
  return next();
};

exports.register.attributes = {
  name: 'db'
};
