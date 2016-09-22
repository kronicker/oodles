/**
 * Created by toma on 20.09.16..
 */
'use strict';

const Hapi = require('hapi');
const db = require('./db/db')

const server = new Hapi.Server();

server.connection({ port : 3000 });

server.register([db], (err) => {

    server.route({
        method: 'POST',
        path: '/newThingy',
        handler: (request, reply) => {

            var entry = {
                name: request.payload.name,
                price: request.payload.price,
                unit: request.payload.unit,
                pictureUrl: request.payload.pictureUrl
            };

            server.methods.Thingy.create(entry, (err) => {
                if (err) {
                    return reply().code(500);
                }
                console.log('did it!');

                return reply().code(204);
            });

        }
    });




    server.start(function(err){

        if(err){
            throw err;
        }
        console.log(`Server running at : ${server.info.uri}`);
    });
});
