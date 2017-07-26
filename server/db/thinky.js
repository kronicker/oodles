const { name: db, host, port } = require('../config').database;
const thinky = require('thinky');

module.exports = thinky({ db, host, port });
