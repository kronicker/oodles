/**
 * Created by toma on 09.11.16..
 */
const Oodler = require('../models/oodler');

function get(id) {
  return Oodler.get(id).run();
}

module.exports = {
  get
};
