/**
 * Created by toma on 09.11.16..
 */
const TotalOodlet = require('../models/totalOodlet');

function get(id) {
  return TotalOodlet
    .get(id)
    .run();
}

function create(oodler) {
  return TotalOodlet({
      oodler: oodler,
      quantifiedThingies: []
    })
    .save();
}

function findActive() {
  return TotalOodlet
    .filter(function (row) {
      return row.hasFields('orderedAt').not();
    })
    .run();
}

module.exports = {
  get,
  create,
  findActive
};
