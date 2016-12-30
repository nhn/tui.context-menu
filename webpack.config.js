var webpack = require('webpack');
var pkg = require('./package.json');

var shouldMinify = process.argv.indexOf('--minify') > -1;

var FILENAME = shouldMinify ? pkg.name + '.min.js' : pkg.name + '.js';
var VERSION = pkg.version;

var minifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: true,
    mangle: true
});
var bannerPlugin = new webpack.BannerPlugin(
    FILENAME
    + '\nVersion: ' + VERSION
);
var plugins = shouldMinify ? [bannerPlugin, minifyPlugin] : [bannerPlugin];

module.exports = {
    entry: './src/index.js',
    output: {
        path: 'dist',
        filename: FILENAME
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                exclude: /(test|node_modules|bower_components)/
            }
        ],
        loaders: [
            {
                //Handlebars-loader issue: https://github.com/pcardune/handlebars-loader/issues/106
                test: /\.hbs$/,
                exclude: /(test|node_modules|bower_components)/,
                loader: 'transform?hbsfy'
            },
            {
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    plugins: plugins,
    devServer: {
        historyApiFallback: false,
        progress: true,
        inline: true,
        host: '0.0.0.0'
    }
};
