'use strict';

const Thingy = require('../models/thingy');

function create(request, response) {
    // response('bla sra').code(200);

	var thingy = new Thingy({
		name: request.payload.name,
		price: request.payload.price,
		unit: request.payload.unit,
		pictureUrl: request.payload.pictureUrl
	});

	return thingy
		.save()
		.then((result) => {
			console.log(result);
			return response(thingy).code(204);
		})
		.catch((err) => {
			return response(err).code(500);
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
