/**
 * Created by toma on 21.09.16..
 */
'use strict';

exports.register = function (server, options, next) {

    let Thingy = require('./Thingy').create();
    let Oodler = require('./Oodler').create();
    let Oodlet = require('./Oodlet').create();

    server.method('Thingy.create', (entry, callback) => {
        var thingy = new Thingy({
            name: entry.name,
            price: entry.price,
            unit: entry.unit,
            pictureUrl: entry.pictureUrl
        });
        thingy.save(function (err) {
            if(err) throw err;
            else {
                console.log('Thingy saved to db');
                callback();
            }
        });
    });

    return next();
};

exports.register.attributes = {
    name: 'db'
};