/**
 * Config file for testing
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */
let pkg = require('./package.json');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let SafeUmdPlugin = require('safe-umd-webpack-plugin');

let webdriverConfig = {
    hostname: 'fe.nhnent.com',
    port: 4444,
    remoteHost: true
};

/**
 * Set config by environment
 * @param {object} defaultConfig - default config
 * @param {string} server - server type ('ne' or local)
 */
function setConfig(defaultConfig, server) {
    if (server === 'ne') {
        defaultConfig.customLaunchers = {
            'IE8': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: '8'
            },
            'IE9': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: '9'
            },
            'IE10': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: '10'
            },
            'IE11': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: '11'
            },
            'Edge': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'MicrosoftEdge'
            },
            'Chrome-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'chrome'
            },
            'Firefox-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'firefox'
            },
            'Safari-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'safari'
            }
        };
        defaultConfig.browsers = [
            'IE8',
            'IE9',
            'IE10',
            'IE11',
            'Edge',
            'Chrome-WebDriver',
            'Firefox-WebDriver'
            // 'Safari-WebDriver' // active only when safari test is needed
        ];
        defaultConfig.reporters.push('coverage');
        defaultConfig.reporters.push('junit');
        defaultConfig.coverageReporter = {
            dir: 'report/coverage/',
            reporters: [
                {
                    type: 'html',
                    subdir(browser) {
                        return 'report-html/' + browser;
                    }
                },
                {
                    type: 'cobertura',
                    subdir(browser) {
                        return 'report-cobertura/' + browser;
                    },
                    file: 'cobertura.txt'
                }
            ]
        };
        defaultConfig.junitReporter = {
            outputDir: 'report/junit',
            suite: ''
        };
    } else {
        defaultConfig.browsers = [
            'ChromeHeadless'
        ];
    }
}

module.exports = function(config) {
    let defaultConfig = {
        basePath: './',
        frameworks: [
            'fixture',
            'jasmine',
            'es5-shim'
        ],
        files: [
            'test/index.js'
        ],
        preprocessors: {
            'test/index.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        exclude: /(test|bower_components|node_modules)/,
                        loader: 'istanbul-instrumenter',
                        query: {
                            esModules: true
                        }
                    },
                    {
                        test: /\.js$/,
                        loader: 'eslint-loader',
                        exclude: /(node_modules|bower_components)/
                    },
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                    }
                ],
                loaders: [
                    {
                        test: /\.hbs$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'transform?hbsfy'
                    },
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel-loader'
                    }
                ]
            },
            plugins: [
                new SafeUmdPlugin(),
                new ExtractTextPlugin(`${pkg.name  }.css`)
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: true
    };

    /* eslint-disable */
    setConfig(defaultConfig, process.env.KARMA_SERVER);
    config.set(defaultConfig);
};
