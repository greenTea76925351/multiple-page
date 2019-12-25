const { resolve } = require('path')
const PurifyCSS = require('purifycss-webpack') //清除无用css
const glob = require('glob-all')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const bastConfig = require('./webpack.base.conf.js') //基础配置
const merge = require('webpack-merge'); //合并两个配置对象
const { views, publicPath, output, proPlugins } = require('./config')
const { loader } = require('./loader')

let { plugins } = loader()

const proConfig = {
  output: {
    path: output.pro, //打包出口目录
    publicPath, //静态资源服务器
    filename: "js/[name]_[chunkhash:8].js"
  },
  mode: 'production',
  optimization: { 
     splitChunks: { //代码分割打包，将第三方库抽离成单独的文件
       chunks: "all",//默认是支持异步，我们使用all
       name: true,
       cacheGroups: { //缓存组
         jquery: { //jquery
          test: /jquery/, //哪些需要缓存
          name: 'jquery' // 要缓存的 打包之后分隔出来的 chunk 名称
        }
       }
     }
   }, 
  plugins: [
    new OptimizeCSSAssetsPlugin({ //压缩css
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }  
    }),
    new PurifyCSS({ //清除无用 css
      paths: glob.sync([//要做 CSS Tree Shaking 的路径文件
        resolve(__dirname, views + '/*/*.html'), //html tree shaking
        resolve(__dirname, views + '/*/*.js')
      ])
    }),
    ...plugins, //扩展多页面打包html插件
    ...proPlugins
  ]
}

module.exports = merge(bastConfig, proConfig)