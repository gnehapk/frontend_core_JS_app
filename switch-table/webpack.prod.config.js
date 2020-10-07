const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const extractScss = new ExtractTextPlugin({
    filename: 'index.css',
    //disable: isDev
});

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: ''
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: __dirname+ '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        extractScss,
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
        }, {
            test: /(\.css|\.scss)$/,
            exclude: /node_modules/,
            use: extractScss.extract({
                use: [
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ],
                fallback: 'style-loader'
            })
        }]
    }
};