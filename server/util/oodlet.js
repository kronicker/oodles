/**
 * Created by toma on 09.11.16..
 */
const Oodlet = require('../models/oodlet');

function create(oodler, dueDate, quantifiedThingies) {
  return Oodlet({
      oodler: oodler,
      dueDate: dueDate,
      quantifiedThingies: quantifiedThingies
    })
    .save();
}

module.exports = {
  create,
};
