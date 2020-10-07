const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
//const CopyPlugin = require('copy-webpack-plugin');

// const env = process.env.NODE_ENV || 'development';
// const isDev = env === 'development';
// const isProd = env === 'production';

const extractScss = new ExtractTextPlugin({
    filename: 'index.css',
    //disable: isDev
});

module.exports = {
    devtool: 'cheap-module-eval-source-map',
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
        // new CopyPlugin([{
        //     from: './*.html'
        //   }]),
        new HTMLWebpackPlugin({
            template: __dirname+ '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        extractScss
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