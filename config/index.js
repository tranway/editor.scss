// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
 
module.exports = {
    distRoot:path.join(__dirname,'../dist'),
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/app/html/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/app'),
    assetsSubDirectory: '.',
    assetsPublicPath: "../",
    productionSourceMap: true,
    
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  } 
}
