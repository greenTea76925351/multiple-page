const { resolve, join } = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包前先清空dist目录
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //将css抽离为独立css文件
const copyWebpackPlugin = require("copy-webpack-plugin"); //静态资源输出
const { src, rules } = require('./config')
const { loader } = require('./loader')

let { entry } = loader()

module.exports = {
  entry,
  mode: 'development',
  module: {
    rules: [
      ...rules, //扩展配置项
      {
        test: /\.css$/,
        include: resolve(__dirname, src), //指定目标文件夹，缩小搜索范围
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: resolve(__dirname, src), //指定目标文件夹，缩小搜索范围
        use: {
          loader: 'file-loader',
          options: {
            name: "[name]_[hash].[ext]",
            esModule: false,
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: resolve(__dirname, src), //指定目标文件夹，缩小搜索范围
      },
      {
        test: /\.ejs$/,
        loader: "ejs-loader"
      }
      // {
      //   test: /\.(html)$/,
      //   include: resolve(__dirname, src), //指定目标文件夹，缩小搜索范围
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       attrs: ['img:src'],//此处的参数值  img是指html中的 <img/> 标签， src是指 img的src属性   表示 html-loader 作用于 img标签中的 src的属性
      //     }
      //   }
      // }
    ]
  },
  resolve: {
    modules: [resolve(__dirname, '../node_modules')],
    alias: {
      '@': join(__dirname, src)
    },
    extensions: [".js"], //! 如果引入文件没有带后缀，会自动匹配对应的后缀，默认只支持 js、json; 配置项越多，打包速度越慢;
  },
  devtool: 'source-map', //源代码与打包后的代码的映射关系,方便调试
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ //打包抽离css文件
      filename: "css/[name]_[contenthash:6].css", 
      chunkFilename: "[id].css"
    }),
    new copyWebpackPlugin([{ //静态资源输出
			from: resolve(__dirname, "../src/assets"),
			to: './assets',
			ignore: ['.*']
		}]),
  ]
}