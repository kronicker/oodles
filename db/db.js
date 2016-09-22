/**
 * Created by toma on 21.09.16..
 */
'use strict';

exports.register = function (server, options, next) {

    let Thingy = require('./Thingy').create();
    let Oodler = require('./Oodler').create();
    let Oodlet = require('./Oodlet').create();

    return next();
};

exports.register.attributes = {
    name: 'db'
};