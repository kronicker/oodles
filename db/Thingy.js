/**
 * Created by toma on 21.09.16..
 */
const thinky = require('./thinky');
const type = thinky.type;

const schema = {
    id: type.string(),
    name: type.string().min(1),
    price: type.number().min(0.01),
    unit: type.string(),
    pictureUrl: type.string()
};

function create() {
    return thinky.createModel("Thingy", schema);
}

module.exports.schema = schema;
module.exports.create = create;