/**
 * Created by toma on 09.11.16..
 */
const Oodlet = require('../models/oodlet');
const thinky = require('../db/thinky');
const r = thinky.r;
const moment = require('moment');

function create(oodler, dueDate) {
  return Oodlet({
      oodler: oodler,
      dueDate: dueDate
    })
    .save();
}

function nextDueDate() {
  return Oodlet
    .orderBy({index: r.desc('dueDate')})
    .run()
    .then(oodlets => {
      let nextDate = oodlets[0].dueDate || new Date();
      while(nextDate <= new Date()) {
        nextDate = moment(nextDate).add(2, 'weeks').toDate();
      }
      return nextDate;
    });
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
  nextDueDate,
  create,
  findActive,
  findPending,
  finalize
};
