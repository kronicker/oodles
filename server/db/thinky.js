const forEach = require('lodash/forEach');
const isFunction = require('lodash/isFunction');
const databaseConfig = require('../config').database;

const thinky = require('thinky')({
  db: databaseConfig.name,
  host: databaseConfig.host,
  port: databaseConfig.port
});

thinky.model = function (name, props, statics = {}, options = {}) {
  if (arguments.length === 1) {
    return thinky.models[name];
  }

  const { schema, indexes = [] } = props;
  const Model = thinky.createModel(name, schema, options);
  indexes.forEach(it => Model.ensureIndex(it));

  forEach(props, (prop, key) =>
    isFunction(prop) && Model.define(key, autorun(prop)));
  forEach(statics, (prop, key) =>
    isFunction(prop) && Model.defineStatic(key, autorun(prop)));

  return Object.assign(Model, {
    get schema() {
      return schema;
    }
  });
};

function autorun(fn) {
  return function () {
    const result = fn.apply(this, arguments);
    return result.run ? result.run() : result;
  };
}

module.exports = thinky;
