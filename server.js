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


    server.start(function(err){

        if(err){
            throw err;
        }
        console.log(`Server running at : ${server.info.uri}`);
    });
});
