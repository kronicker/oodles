/**
 * Created by toma on 09.11.16..
 */
const Oodler = require('../models/oodler');

function get(id) {
  return Oodler.get(id).run();
}

function getAdmins() {
  return Oodler
    .filter({scope: 'admin'})
    .run();
}

module.exports = {
  get,
  getAdmins
};
