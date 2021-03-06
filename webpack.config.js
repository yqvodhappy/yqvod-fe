/*
* @Author: Dtvikey
* @Date:   2019-10-29 16:21:16
* @Last Modified by:   Dtvikey
* @Last Modified time: 2020-05-06 10:08:38
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变了配置。 dev/online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        favicon  : './favicon.ico',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    };
};
// webpack config
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index'  : ['./src/page/index/index.js'],
        'list'   : ['./src/page/list/index.js'],
        'detail' : ['./src/page/detail/index.js'],
    },
    output: {
        path        : __dirname + '/dist/',
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.yqrb.com.cn/yqvod-fe/dist/',
        filename    : 'js/[name].js'
    },
    externals:{
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
    },
    resolve: {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image',
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件
        new ExtractTextPlugin('css/[name].css'),
        // html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','影片列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','影片详情页')),

    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;