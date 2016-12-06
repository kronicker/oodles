/**
 * Created by toma on 21.09.16..
 */
'use strict';

const thinky = require('../db/thinky');
const type = thinky.type;

const schema = {
  id: type.string(),
  firstName: type.string().min(2),
  lastName: type.string().min(2),
  email: type.string().email(),
  password: type.string(),
  scope: type.string().enum(['admin', 'user']),
  office: type.string().min(1)
};

module.exports = (() => {
  let model = thinky.createModel("Oodler", schema);

  model.schema = schema;

  return model;
})();

