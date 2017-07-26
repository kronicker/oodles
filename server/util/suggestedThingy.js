const Thingy = require('../models/thingy');
const SuggestedThingy = require('../models/suggestedThingy');

function get(id) {
  return SuggestedThingy.get(id).run();
}

function remove(id) {
  return SuggestedThingy.get(id).delete().run();
}

module.exports = {
  get,
  remove,
};
