/**
 * Created by toma on 21.09.16..
 */
'use strict';

exports.register = function (server, options, next) {

    let Thingy = require('../models/thingy');
    let Oodler = require('../models/oodler');
    let Oodlet = require('../models/oodlet');

    return next();
};

exports.register.attributes = {
    name: 'db'
};
