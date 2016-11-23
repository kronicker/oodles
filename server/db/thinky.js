/**
 * Created by toma on 22.09.16..
 */
const databaseConfig = require('../config').database;

var thinky = require('thinky')({
  db: databaseConfig.name,
  host: databaseConfig.host,
  port: databaseConfig.port,
});

module.exports = thinky;
