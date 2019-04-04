/**
 * Configs file for bundling
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */
/* global process:true */

var pkg = require('./package.json');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SafeUmdPlugin = require('safe-umd-webpack-plugin');
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        'drop_console': true,
        warnings: false
    },
    'support_ie8': true,
    mangle: true
});

var isProduction = process.argv.indexOf('-p') > -1;

var FILENAME = pkg.name + (isProduction ? '.min.js' : '.js');
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
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
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
            }
        ]
    },
    plugins: [
        new SafeUmdPlugin(),
        new ExtractTextPlugin(pkg.name + '.css'),
        new webpack.BannerPlugin(BANNER)
    ],
    devServer: {
        historyApiFallback: false,
        progress: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
};

if (isProduction) {
    config.plugins.push(uglifyJsPlugin);
}

module.exports = config;
