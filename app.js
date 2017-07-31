const Hapi = require('hapi');
const Inert = require('inert');

const boomErrors = require('./server/extensions/boomErrors');
const config = require('./server/config');
const monitor = require('./server/monitor');
const routes = require('./server/routes/');


const server = new Hapi.Server();
server.connection({
  port: config.server.port
});

server.register([Inert, boomErrors, routes, monitor], () => {

  server.start(err => {
    if (err) {
      throw err;
    }

    console.log(`Server running at : ${server.info.uri}`); // eslint-disable-line no-console
  });
});

module.exports = server;

