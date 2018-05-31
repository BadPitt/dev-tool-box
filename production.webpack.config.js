let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let WebExtensionPlugin = require('./src/WebExtensionPlugin');
let manifest = require('./manifest.json');

module.exports = function (env, argv) {
	return {
		entry: {
			popup: "./src/popup",
			options: "./src/options",
			vendor: ['react', 'react-dom', 'jsonschema', 'prop-types']
		},

		output: {
			path: path.resolve(__dirname, 'build'),
			filename: "[name]/bundle.js",
			chunkFilename: "[name]/bundle.js",
			//publicPath: "/",
			library: "DevToolBox"
		},

		//mode: env.production ? 'production' : 'development',
		devtool: 'eval',

		watch: true,
		watchOptions: {
			aggregateTimeout: 100
		},

		module: {
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: "babel-loader"
				},
				{
					test: /\.css/,
					use: ExtractTextPlugin.extract('css-loader', 'style-loader')
				}
			]
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: "vendor",
				// filename: "vendor.js"
				// (Give the chunk a different name)

				children: true,
				// (select all children of chosen chunks)

				minChunks: Infinity,
				// (with more entries, this ensures that no other module
				//  goes into the vendor chunk)
			}),
			new ExtractTextPlugin('[name]/styles.css', {
				allChunks: true
			}),
			new WebExtensionPlugin(
				{
					manifestData: manifest
				},
				{
					path: 'src/images/',
					pattern: /\.(jpe?g|png|gif|svg)$/i,
					root: __dirname,
					outputDirectory: 'images'
				}),
			new HtmlWebpackPlugin({
				title: 'React extension',
				filename: 'popup/index.html',
				template: 'src/popup/index.html',
				chunks: ['popup']
			}),
			new HtmlWebpackPlugin({
				title: 'React extension options',
				filename: 'options/index.html',
				template: 'src/options/index.html',
				chunks: ['options']
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: 'optimize-minimize'
			})
		]
	}
};