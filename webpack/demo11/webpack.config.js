var path = require('path');
var webpack=require('webpack');
var CleanWebpackPlugin=require("clean-webpack-plugin");
var HtmlWebpackPlugin=require("html-webpack-plugin");
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers',
    libraryTarget: 'umd'
  },
  plugins:[
  	 new CleanWebpackPlugin(),
  	 new HtmlWebpackPlugin({
  	 		title:"npm publish library"
  	 }),
  	 new webpack.ProvidePlugin({ // ProvidePlugin 可以将模块作为一个变量，被webpack在其他每个模块中引用。只有你需要使用此变量的时候，这个模块才会被 require 进来。
      _: ['lodash']
    })
  ],
  externals: {
     lodash: {
       commonjs: 'lodash',
       commonjs2: 'lodash',
       amd: 'lodash',
       root: '_'
     }
   }
};
