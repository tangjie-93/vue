const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
//const webpack = require("webpack");

module.exports = {
	entry: {
		index: './src/index.js',
//		another: "./src/another-module.js"
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HTMLWebpackPlugin({
			tittle: 'Code Splitting'
		}),

	],
//	optimization: {
//		splitChunks: {
//			cacheGroups: {
//				commons: {
//					name: "commons",
//					chunks: "initial",
//					minChunks: 2
//				}
//			}
//		}
//	},
	output: {
		filename: "[name].bundle.js",
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, "dist")
	}
}