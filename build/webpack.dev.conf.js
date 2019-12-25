const bastConfig = require('./webpack.base.conf.js') //基础配置
const merge = require('webpack-merge'); //合并两个配置对象
const webpack = require('webpack')
const { publicPath, output, devServer, devPlugins } = require('./config')
const { loader } = require('./loader')
let { plugins } = loader()

const devConfig = {
  output: {
    path: output.dev,
    publicPath,
    filename: "js/[name]_[hash:6].js"
  },
  mode: 'development',
  devServer,
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    ...plugins, //扩展多页面打包插件
    ...devPlugins,
  ]
}

module.exports = merge(bastConfig, devConfig)