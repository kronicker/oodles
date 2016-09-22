/**
 * Created by toma on 21.09.16..
 */
'use strict';

exports.register = function (server, options, next) {

    let Thingy = require('./Thingy');
    let Oodler = require('./Oodler');
    let Oodlet = require('./Oodlet');

    return next();
};

exports.register.attributes = {
    name: 'db'
};