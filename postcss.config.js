module.exports = {
  plugins: [
    require('autoprefixer')({ overrideBrowserslist: ["last 10 versions", ">1%", "not ie <= 8"] })
  ]
}

