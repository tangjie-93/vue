const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
module.exports={
	entry:'./src/index.js',
	devtool:"inline-source-map",
	devServer:{
		contentBase:'./dist'
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title:'Output Management'
		})
	],
	output:{
		filename:'bundle.js',
		path:path.resolve(__dirname,'dist')
	},
	mode:"development",//压缩输出
}
