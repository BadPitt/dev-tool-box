'use strict';

let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ManifestPlugin = require('./src/ManifestPlugin');

module.exports = {
	entry: {
		popup: "./src",
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "[name]/bundle.js",
		library: "DevToolBox"
	},

	watch: true,
	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: "source-map",

	// alias for local loader
	// resolveLoader: {
	// 	alias: {
	// 		'manifest-loader': path.join(__dirname, 'src', 'ManifestPlugin'),
	// 	},
	// },

	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ['es2015', 'react', 'stage-0', 'stage-1']
				}
			},
			{
				test: /\.css/,
				use: ExtractTextPlugin.extract('css-loader', 'style-loader')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('popup/styles.css', {
			allChunks: true
		}),
		new ManifestPlugin({
			manifestFileName: "manifest.json",
			manifestData: {
				name: "DevToolbox",
				version: "0.0.1",
				description: "Extension with most frequently used developer's tools",
				permissions: ["activeTab", "declarativeContent", "storage"],
				browser_action: {
					default_popup: "popup/index.html",
					default_title: "React Ext"
				},
				manifest_version: 2
			}
		}),
		new HtmlWebpackPlugin({
			title: 'React extension',
			filename: 'popup/index.html',
			// Load a custom template (lodash by default see the FAQ for details)
			template: 'src/index.html'
		})
	]
};