const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/index.ts"
	},
	devtool:"inline-source-map",
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			title: "typeScript"
		}),
		new webpack.ProvidePlugin({
			join: ["lodash", 'join']
		})

	]
}