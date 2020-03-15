const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
//entry: './src/index.js',
	entry:{
		app:'./src/index.js',
		print:'./src/print.js'
	},
	devtool:"inline-source-map",
	devServer:{
		contentBase:'./dist'
	},
	plugins:[
	 		new CleanWebpackPlugin(['dist']),
			new HtmlWebpackPlugin({
       	title: 'Output Management htmlTemplate',
       	filename:'index.html'
     })
	],
  output: {
//  filename: 'bundle.js',
		filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(csv|tsv)$/,
         use: [
          'csv-loader'
         ]
       },
       {
         test: /\.xml$/,
         use: [
           'xml-loader'
         ]
       }
     ]
   }
};