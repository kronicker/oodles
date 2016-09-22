/**
 * Created by toma on 21.09.16..
 */
'use strict';

exports.register = function (server, options, next) {

    let Thingy = require('./thingy');
    let Oodler = require('./oodler');
    let Oodlet = require('./oodlet');

    return next();
};

exports.register.attributes = {
    name: 'db'
};