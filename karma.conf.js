/**
 * Config file for testing
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */
const pkg = require('./package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webdriverConfig = {
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
      IE8: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'internet explorer',
        version: '8'
      },
      IE9: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'internet explorer',
        version: '9'
      },
      IE10: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'internet explorer',
        version: '10'
      },
      IE11: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'internet explorer',
        version: '11',
        platformName: 'windows'
      },
      Edge: {
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
            return `report-html/${browser}`;
          }
        },
        {
          type: 'cobertura',
          subdir(browser) {
            return `report-cobertura/${browser}`;
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
    defaultConfig.browsers = ['ChromeHeadless'];
  }
}

module.exports = function(config) {
  const defaultConfig = {
    basePath: './',
    frameworks: ['fixture', 'jasmine', 'es5-shim'],
    files: ['test/index.js'],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.hbs$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'transform-loader?hbsfy'
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
          },
          {
            test: /\.js$/,
            exclude: /(test|bower_components|node_modules)/,
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            }
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          },
          {
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /(node_modules|bower_components)/,
            enforce: 'pre'
          }
        ]
      },
      plugins: [new MiniCssExtractPlugin({filename: `${pkg.name}.css`})]
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
