'use strict';

const thinky = require('../db/thinky');
const type = thinky.type;
const moment = require('moment');

const schema = {
  value: type.string(),
  expiresAt: type.date().default(() => moment().add(2, 'hours').toDate()),
  userId: type.string()
};

module.exports = (() => {
  let model = thinky.createModel("Token", schema);

  model.schema = schema;

  return model;
})();
