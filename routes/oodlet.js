/**
 * Created by toma on 23.09.16..
 */
'use strict'

const Oodlet = require('../models/oodlet');
// const Oodler = require('../models/oodler');
// const Thingy = require('../models/thingy');

function create(request, response) {
    //Not sure how to make this work in non-blocking way and be pretty
    //
    // Oodler.sample(1).run().then(function(result) {
    //     console.log(result[0]);
    // });
    //
    // Thingy.sample(5).run().then(function(result) {
    //     console.log(result);
    // });

    var oodlet = new Oodlet({
        date: request.payload.date,
        //oodler:
        //thingies:
        total: request.payload.total
    });

    oodlet
        .save()
        .then((result) => {
            return response(oodlet).code(204);
        })
        .catch((err) => {
            return response(err).code(500);
        });
}

let routes = [{
    method: 'POST',
    path: '/oodlet',
    handler: create
}];

module.exports = function(server) {
    server.route(routes);
};