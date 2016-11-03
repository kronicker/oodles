/**
 * Created by toma on 22.09.16..
 */
const databaseConfig = require('../config').database;

var thinky = require('thinky')({
  db: databaseConfig.name
});

module.exports = thinky;
