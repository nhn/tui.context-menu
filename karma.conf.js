/**
 * Config file for testing
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */

var pkg = require('./package.json');
var SafeUmdPlugin = require('safe-umd-webpack-plugin');

var webdriverConfig = {
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
                    subdir: function(browser) {
                        return 'report-html/' + browser;
                    }
                },
                {
                    type: 'cobertura',
                    subdir: function(browser) {
                        return 'report-cobertura/' + browser;
                    },
                    file: 'cobertura.txt'
                }
            ]
        };
        defaultConfig.junitReporter = {
            outputDir: 'report',
            suite: ''
        };
    } else {
        defaultConfig.browsers = [
            'ChromeHeadless'
        ];
    }
}

module.exports = function(config) {
    var defaultConfig = {
        basePath: './',
        frameworks: [
            'jquery-1.11.0',
            'fixture',
            'jasmine',
            'es5-shim'
        ],
        files: [
            {
                pattern: 'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                watched: false
            },
            {
                pattern: 'node_modules/tui-code-snippet/dist/tui-code-snippet.js',
                watched: false
            },
            {
                pattern: 'node_modules/tui-dom/dist/tui-dom.js',
                watched: false
            },
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
                        exclude: /(dist|node_modules|bower_components)/
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
                new SafeUmdPlugin()
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
