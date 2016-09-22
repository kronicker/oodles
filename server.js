/**
 * Created by toma on 20.09.16..
 */
'use strict';

const Hapi = require('hapi');
const db = require('./db/db')

const server = new Hapi.Server();

server.connection({ port : 3000 });

// Add all routes
require('./routes/all')(server);

server.register([db], (err) => {

    // //Create a new entry
    // server.route({
    //     method: 'GET',
    //     path: '/test',
    //     handler: function (request, reply) {
    //
    //         var thingy = {
    //             name: 'Banana',
    //             price: 'deset',
    //             unit: 'kg',
    //             pictureUrl: Date().toString()
    //         };
    //
    //
    //         server.methods.Thingy.create(thingy, (result, err) => {
    //
    //             if (err) {
    //                 console.dir(err);
    //                 return reply().code(500);
    //             }
    //
    //             return reply(result).code(204);
    //         });
    //     }
    // });


    server.start(function(err){

        if(err){
            throw err;
        }
        console.log(`Server running at : ${server.info.uri}`);
    });
});
