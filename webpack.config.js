'use strict';

//const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

//import webpack from 'webpack';

const config = {
	entry: './src/background/background',

	output: {
		filename: './bundle.js'
	},

	module: {
		rules: [
			{test: /\.txt$/, use: 'raw-loader'},
			{test: /\.js$/, use: 'babel-loader'}
		]
	},
	mode: "development"
	// },
	// plugins: [
	// 	new HtmlWebpackPlugin({template: './src/index.html'})
	// ]
};

module.exports = config;
// export default config;