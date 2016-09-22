/**
 * Created by toma on 21.09.16..
 */
'use strict';

exports.register = function (server, options, next) {

    let Thingy = require('./Thingy').create();
    let Oodler = require('./Oodler').create();
    let Oodlet = require('./Oodlet').create();
    let thinky = require('./thinky');
    let r = thinky.r;


    server.method('Thingy.create', (entry, callback) => {
        var thingy = new Thingy(entry);

        thingy.save(function (err) {
            if(err) throw err;
            else {
                console.log('Thingy saved to db');
                callback();
            }
        });
    });

    server.method('Oodler.create', (entry, callback) => {
        var oodler = new Oodler(entry);

        oodler.save(function (err) {
            if(err) throw err;
            else {
                console.log('Oodler saved to db');
                callback();
            }
        });
    });

    server.method('Oodlet.create', (entry, callback) => {

    //     var oodlet = new Oodlet (entry);
    //
    //     oodlet.save(function (err) {
    //         if(err) throw err;
    //         else {
    //             console.log('Oodlet saved to db');
    //             callback();
    //         }
    //     });
    // });

    return next();
};

exports.register.attributes = {
    name: 'db'
};