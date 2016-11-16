const webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
}

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        files: [{
            pattern: './src/tests.context.js',
            watched: false,
        },],
        frameworks: ['jasmine'],
        preprocessors: {
            './src/tests.context.js': ['webpack', 'sourcemap'],
        },
        reporters: ['dots'],
        singleRun: true,
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true,
        },
    });
};