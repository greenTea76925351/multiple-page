# 基于webpack4.x 多入口，多页面项目构建案例
webpack4.x 构建多页面工程解决方案
多入口文件，自动构建入口，支持多页面型的项目
支持js、css、less等代码编译、兼容、压缩混淆、打包抽离、构建等
ES6等新语法转译
扩展方便、开箱即用

## 安装依赖
```
$ npm install
```

## 目录结构说明

``` js
    .
    ├── build                     # 配置规则
    │   ├── config.js               # 工程扩展配置
    │   ├── webpack.base.conf.js    # webpack基础配置
    │   ├── webpack.dev.conf.js     # 开发环境webpack配置入口
    │   ├── webpack.prod.conf.js    # 生产环境webpack配置入口
    ├── src                       # 源码目录
    │   ├── assets/                 # 公共静态资源
    │   │   ├── images/               # 图片资源
    │   ├── less                    # less目录
    │   │   ├── config.less           # 定义全局公用的变量、函数
    │   │   ├── index.less            # 全局公用的样式文件
    │   ├── pages/                  # 页面文件
    │   │   ├── index                 # 首页文件夹
    │   │   │    ── index.html           html模板文件
    │   │   │    ── index.js            # js文件
    │   │   │    ── index.less          # less文件
    │   │   ├── login                 # 登录页面文件夹
    │   │   │    ── login.html          # html模板文件
    │   │   │    ── login.js            # js文件
    │   │   │    ── login.less          # less文件
    │   ├── utils/                   # 全局工具函数库
    │   │   ├── http.js                 # 基于axios封装的 get、post、formData 请求方法
    │   │   ├── serverAPI.js            # 全局所有的api接口配置
    ├── .babelrc                  # babel配置
    ├── package.json              
    ├── README.md                 
    ├── postcss.config.js         #CSS自动兼容配置
```

## 添加页面说明：
```
pages下面一个文件夹既是一个单独的页面，其中.html、.js、.less文件名称与页面文件夹保持一致
```

## 编译开发环境代码
会对js/less进行编译抽离成单独的文件，但不会压缩代码，并自动在html文件中引入
```
$ npm run dev
```

## 编译开发环境并启动 webpack-dev-server 服务
```
$ npm run serve
```

## 编译生产环境
会对js/less进行编译混淆并压缩代码，抽离成单独的文件，并自动在html文件中引入
```
$ npm run build
```
