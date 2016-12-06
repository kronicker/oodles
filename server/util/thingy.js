/**
 * Created by toma on 02.12.16..
 */
const Thingy = require('../models/thingy');

function get(id) {
  return Thingy.get(id).run();
}

function save(name, unit, pictureUrl) {
  return Thingy({
      name: name,
      unit: unit,
      pictureUrl: pictureUrl
    })
    .save();
}

function filterByName(name) {
  return Thingy
    .filter({name: name})
    .run();
}

module.exports = {
  get,
  filterByName,
  save
};
