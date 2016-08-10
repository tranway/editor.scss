var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var nodepath = path.join(__dirname, '../node_modules');

module.exports = {
    entry: {
        app: ['./src/index.js']
    },
    target: 'node-webkit',
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js',
        hotUpdateChunkFilename: '[id].[hash].hot-update.js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'node': path.resolve(__dirname, '../node_modules'),
            'components': path.resolve(__dirname, '../src/components'),
            'scss': path.join(__dirname, '../src/scss'),
            vue: path.resolve(__dirname, '../node_modules', 'vue'),
            lodash: path.resolve(__dirname, '../node_modules', 'lodash') 

        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/

            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.html$/,
                loader: 'vue-html'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }

        ]
    },
     
    vue: {
        loaders: utils.cssLoaders()
    }
}
