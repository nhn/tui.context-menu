module.exports = function(config) {
    config.set({
        colors: true,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
        frameworks: [
            'jasmine',
            'fixture'
        ],
        files: [
            'bower_components/tui-code-snippet/code-snippet.js',
            'bower_components/tui-dom/dist/domutil.js',
            'bower_components/tui-component-floatinglayer/dist/floatingLayer.js',
            'test/**/*.spec.js' // each file acts as entry point for the webpack configuration
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
            'Chrome'
        ]
    });
};
