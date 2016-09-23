/**
 * Created by toma on 23.09.16..
 */
'use strict'

const Oodlet = require('../models/oodlet');

function create(request, response) {

    var oodlet = new Oodlet({
        oodlerEmail: request.payload.oodlerEmail,
        date: request.payload.date,
        total: request.payload.total
    });

    oodlet
        .save()
        .then((result) => {
            console.log(result);
            return response(result).code(204);
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