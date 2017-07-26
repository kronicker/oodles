const Oodlet = require('../models/oodlet');

function create(oodler, dueDate, quantifiedThingies) {
  return Oodlet({
      oodler: oodler,
      dueDate: dueDate,
      quantifiedThingies: quantifiedThingies
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
