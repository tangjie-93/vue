const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
    config.output.globalObject('this')
    config.module
      .rule('css')
      .test(/\.css$/)
      .oneOf('vue')
      .resourceQuery(/\?vue/)
      .use('px2rem')
      .loader('px2rem-loader')
      .options({
        remUnit: 19.2
      })
  },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.worker.js$/,
      use: {
        loader: 'worker-loader',
        options: { inline: true, name: 'workerName.[hash].js' }
      }
    })
  },
  parallel: false,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    port: 8002,
    inline: true,
    hot: true,
    overlay: {
      warnings: false
    }
   
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 19.2, // 换算的基数
            propList: ['*']
          })
        ]
      },
        less: {
          javascriptEnabled: true
        }
    //   sass: {
    //     prependData: `
    //       @import "@/assets/css/variable.scss";
    //     `
    //   },
    //   scss: {
    //     prependData: `@import "@/assets/css/variable.scss";`
    //   }
    }
  }
}
