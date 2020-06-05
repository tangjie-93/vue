// import { Configuration } from 'webpack'
//清除dist数组
const {CleanWebpackPlugin} =require("clean-webpack-plugin")
//生成html
const HtmlWebpackPlugin=require('html-webpack-plugin')
//复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
/**
 * @type {Configuration}
 */
module.exports={
    mode:'none',
    entry:'./src/main.css',
    output:{
        filename:'bundle1.js'
    },
    module:{
        rules:[
            {
                test:/\.md$/,
                use:[
                    'html-loader',
                    './markdown-loader.js'
                ]
            },{
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"html-webpack-plugin",
            meta: {
                viewport: 'width=device-width'
              },
              template:'./index.html'
        }),
    ]
}