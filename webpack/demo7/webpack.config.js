const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
//const webpack = require("webpack");

module.exports = {
	entry: {
		index: './src/index.js',
//		another: "./src/another-module.js"
	},
	devtool:"inline-source-map",
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HTMLWebpackPlugin({
			tittle: 'cathing'
		}),

	],

	output: {
		filename: "[name].[chunkhash].js",
		path: path.resolve(__dirname, "dist")
	}
}