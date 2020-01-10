const fs = require('fs');
const path = require('path')

function readFileList (dir, fileList) { //递归遍历页面目录
  const url = path.resolve(__dirname, dir)
  const files = fs.readdirSync(url);
  files.forEach(file => {
    let fullPath = path.join(url,file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fileList[file] = { html: '', js: '', less: '' }
      readFileList(fullPath, fileList)
    } else {
      let h = file.split('.')[1], filename = file.replace('.' + h, '');
        fileList[filename][h] = fullPath;
    }
  })
  return fileList
}

module.exports = { readFileList }
