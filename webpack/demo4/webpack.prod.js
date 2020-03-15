//const merge=require('webpack-merge');
//const UglifyJSPlugin=require('uglifyjs-webpack-plugin');
//const common=require('./webpack.common.js');
//
//module.exports=merge(common,{
//	plugins:[
//		new UglifyJSPlugin()
//	]
//});
const webpack=require("webpack");
const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   devtools:'source-map',
   plugins: [
     new UglifyJSPlugin({
     	sourceMap:true
     }),
     new webpack.DefinePlugin({
     	'process.env.Node_ENV':JSON.stringify("production")
     })
   ]
 });
