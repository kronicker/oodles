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
