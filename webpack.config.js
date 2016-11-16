var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


var config = {
    srcDir: 'src',
    entry: 'app.jsx',
    outputDir: 'public',
    outputFile: 'dist/bundle.js', //relative to outputDir

}




module.exports = {
    devtool: 'eval-source-map',

    entry: path.join(__dirname, config.srcDir, config.entry),
    output: {
        path: path.join(__dirname, config.outputDir),
        filename: config.outputFile
    },
    resolveLoader: {
        root: '../node_modules',
        moduleTemplates: ['*-loader']
    },
    module: {
        loaders: [{
            test: /.js[x]?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: require.resolve("file-loader") + '?name=assets/[name].[ext]'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, config.outputDir),
        colors: true,
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        new DashboardPlugin(),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ]
}