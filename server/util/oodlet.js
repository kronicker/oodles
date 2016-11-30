/**
 * Created by toma on 09.11.16..
 */
const Oodlet = require('../models/oodlet');

function create(oodler, dueDate) {
  return Oodlet({
      oodler: oodler,
      dueDate: dueDate
    })
    .save();
}

function findActive(office) {
  return Oodlet
    .filter({ oodler: { office: office} })
    .filter(row => row('dueDate').gt(new Date()))
    .run();
}

function findPending() {
  return Oodlet
    .filter(row =>
      row('dueDate').lt(new Date())
      .and(row.hasFields('orderedAt').not())
    )
    .run();
}

function* finalize(oodletIds) {
  for(let id of oodletIds) {
    yield Oodlet
      .get(id)
      .update({
        orderedAt: new Date()
      })
      .run();
  }
}

module.exports = {
  create,
  findActive,
  findPending,
  finalize
};
