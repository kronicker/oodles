/**
 * Created by toma on 21.09.16..
 */
const thinky = require('./thinky');
const type = thinky.type;

const schema = {
    id: type.string(),
    firstName: type.string().min(2),
    lastName: type.string().min(2),
    email: type.string().email(),
    office: type.string().min(1)
};

function create() {
    return thinky.createModel("Oodler", schema);
}

module.exports.schema = schema;
module.exports.create = create;