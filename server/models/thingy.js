const thinky = require('../db/thinky');
const type = thinky.type;

const schema = {
  id: type.string(),
  name: type.string().min(1),
  unit: type.string(),
  pictureUrl: type.string()
};

const Oodlet = thinky.model('Thingy', { schema });
module.exports = Oodlet;
