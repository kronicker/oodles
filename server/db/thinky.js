/**
 * Created by toma on 22.09.16..
 */
const dbName = require('../config').dbName;

var thinky = require('thinky')({
  db: dbName
});

module.exports = thinky;
