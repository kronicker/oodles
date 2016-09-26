/**
 * Created by toma on 21.09.16..
 */
'use strict';

exports.register = function (server, options, next) {

	return next();
};

exports.register.attributes = {
	name: 'db'
};
