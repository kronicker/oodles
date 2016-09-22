'use strict';

const Thingy = require('../db/thingy');

function create(request, response) {
	var thingy = new Thingy({
    name: request.payload.name,
    price: request.payload.price,
    unit: request.payload.unit,
    pictureUrl: Date().toString(),
    bla: 'bla'
	});

	thingy.save().then((result) => {
		console.log(result);
		return response(thingy).code(204);
	});
}

let routes = [{
	method: 'POST',
	path: '/thingy',
	handler: create
}];

module.exports = function(server) {
	server.route(routes);
};
