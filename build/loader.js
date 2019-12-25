
const fs = require('fs')
const path = require('path')
const { views, favicon } = require('./config')
const htmlWebpackPlugin = require("html-webpack-plugin"); //在打包结束后，自动生成一个html文件，并把打包生成的js模块引入到该html中

function readFileList (dir, fileList) {
  const url = path.resolve(__dirname, dir)
  const files = fs.readdirSync(url);
  files.forEach(file => {
    let fullPath = path.join(url,file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fileList[file] = { html: '', js: '', less: '' }
      readFileList(fullPath,fileList)
    } else {
      let h = file.split('.')[1], filename = file.replace('.' + h, '');
        fileList[filename][h] = fullPath;
    }
  })
  return fileList
}

function loader () {
  let entry = {}, plugins = [];
  let filename = readFileList(views,{})
  for (let key in filename) {
    // let conf = require(filename[key].json) //备用扩展.json文件
    entry[key] = filename[key].js
    plugins.push(new htmlWebpackPlugin({
      filename: `pages/${key}.html`,
      template: filename[key].html,
      chunks: [key], //指定需要引入哪一个js模块
      inject: true, //
      favicon: path.join(__dirname, favicon),
    }))
  }
  return { entry, plugins }
}

module.exports = { loader }