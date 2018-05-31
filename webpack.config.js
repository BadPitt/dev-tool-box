'use strict';

let webpack = require('webpack');
let production = require('./production.webpack.config.js');
let develop = require('./develop.webpack.config.js');

module.exports = function (env, argv) {
	if (env && env.production) {
		return production(env, argv);
	}
	return develop();
};