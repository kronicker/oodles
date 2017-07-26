const thinky = require('../db/thinky');
const { type } = thinky;
const moment = require('moment');

const schema = {
  value: type.string(),
  expiresAt: type.date().default(() => moment().add(2, 'hours').toDate()),
  userId: type.string()
};

const model = thinky.createModel('Token', schema);
model.schema = schema;

module.exports = model;
