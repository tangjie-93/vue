const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
//const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry:{
		index:'./src/index.js',
		polyfills:'./src/polyfills.js'
	},
	output: {
//		filename: "bundle.js",
		filename:'[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
				test: require.resolve('./src/index.js'),
				use: 'imports-loader?this=>window'
			},
			{
				test: require.resolve('./src/globals.js'),
				use: 'exports-loader?file,parse=helpers.parse'
			}
		]
	},
	plugins: [
//		new CleanWebpackPlugin(["dist"]),
//		new HtmlWebpackPlugin({
//			title: "ProvidePlugin"
//		}),//生成dist下的index.hhml
		new webpack.ProvidePlugin({
			_: 'lodash',
			join: ['lodash', 'join']
		})
	]
}