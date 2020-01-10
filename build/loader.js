const { readFileList } = require('./utils')
const { views } = require('./config')
const htmlWebpackPlugin = require("html-webpack-plugin"); //在打包结束后，自动生成一个html文件，并把打包生成的js模块引入到该html中

function loader () {
  let entry = {}, plugins = [];
  let filename = readFileList(views,{}); //读取页面目录
  for (let key in filename) {
    let chunks = [];
    if (filename[key].js) { //如果js文件存在，直接放到入口里面
      entry[key] = filename[key].js
      chunks = [key]
    } 
    plugins.push(new htmlWebpackPlugin({
      filename: `pages/${key}.html`,
      template: filename[key].html,
      chunks, //指定需要引入哪一个js模块
      inject: true, //
      minify: {  //压缩html文件
        removeComments: true, //移除html中的注释
        collapseWhitespace: true, //删除空白符和换行符
        minifyCSS: true //压缩内联css
      }
    }))
  }
  return { entry, plugins }
}

module.exports = { loader }