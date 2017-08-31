/**
 * Configs file for bundling
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
/* global process:true */

var pkg = require('./package.json');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SafeUmdPlugin = require('safe-umd-webpack-plugin');
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: true,
    mangle: true
});

var shouldMinify = process.argv.indexOf('--minify') > -1;
var isProduction = process.argv.indexOf('-p') > -1;
var minify = shouldMinify || isProduction;

var FILENAME = pkg.name + (minify ? '.min.js' : '.js');
var BANNER = [
    FILENAME,
    '@version ' + pkg.version,
    '@author ' + pkg.author,
    '@license ' + pkg.license
].join('\n');

var config = {
    eslint: {
        failOnError: isProduction
    },
    entry: './src/js/index.js',
    output: {
        library: ['tui', 'ContextMenu'],
        libraryTarget: 'umd',
        path: 'dist',
        publicPath: 'dist/',
        filename: FILENAME
    },
    externals: {
        'tui-code-snippet': {
            'commonjs': 'tui-code-snippet',
            'commonjs2': 'tui-code-snippet',
            'amd': 'tui-code-snippet',
            'root': ['tui', 'util']
        },
        'tui-dom': {
            'commonjs': 'tui-dom',
            'commonjs2': 'tui-dom',
            'amd': 'tui-dom',
            'root': ['tui', 'dom']
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /(dist|node_modules|bower_components)/
            },
            {
                test: /\.png$/,
                loader: 'url-loader'
            }
        ],
        loaders: [
            {
                // Handlebars-loader issue: https://github.com/pcardune/handlebars-loader/issues/106
                test: /\.hbs$/,
                exclude: /(test|node_modules|bower_components)/,
                loader: 'transform?hbsfy'
            },
            {
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },
    plugins: [
        new SafeUmdPlugin(),
        new webpack.BannerPlugin(BANNER),
        new ExtractTextPlugin('./hihihihi.css')
    ],
    devServer: {
        historyApiFallback: false,
        progress: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
};

if (minify) {
    config.plugins.push(UglifyJsPlugin);
}

module.exports = config;
