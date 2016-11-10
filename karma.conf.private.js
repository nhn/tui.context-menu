var webdriverConfig = {
    hostname: 'fe.nhnent.com',
    port: 4444,
    remoteHost: true
};

module.exports = function(config) {
    config.set({
        colors: true,
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
        frameworks: [
            'jasmine',
            'fixture'
        ],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'bower_components/tui-code-snippet/code-snippet.js',
            'bower_components/tui-dom/dist/domutil.js',
            'bower_components/tui-component-floatinglayer/dist/floatingLayer.js',
            'test/**/*.spec.js'
        ],
        preprocessors: {
            'test/**/*.spec.js': ['webpack']
        },
        webpack: {
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
                        test: /\.hbs$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'transform?hbsfy'
                    },
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel'
                    }
                ]
            }
        },
        reporters: [
            'dots',
            'junit'
        ],
        junitReporter: {
            outputDir: 'reports/junit',
            suite: ''
        },
        browsers: [
            'IE8',
            'IE9',
            'IE10',
            'IE11',
            'Edge',
            'Chrome-WebDriver',
            'Firefox-WebDriver'
        ],
        customLaunchers: {
            'IE8': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 8
            },
            'IE9': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 9
            },
            'IE10': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 10
            },
            'IE11': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 11
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
            }
        }
    });
};
