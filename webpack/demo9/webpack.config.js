const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkBoxPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
module.exports = {
	entry: './src/index.js',
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			title: 'Progressive Web Application'
		}),
		new WorkBoxPlugin.GenerateSW({
			// 这些选项帮助 ServiceWorkers 快速启用
			// 不允许遗留任何“旧的” ServiceWorkers
			clientsClaim: true,
			skipWaiting: true
		}),
		new webpack.ProvidePlugin({
			join: ["lodash", 'join']
		})
	]
}