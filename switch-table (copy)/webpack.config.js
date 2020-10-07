const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// const env = process.env.NODE_ENV || 'development';
// const isDev = env === 'development';
// const isProd = env === 'production';

const extractScss = new ExtractTextPlugin({
    filename: 'index.css',
    //disable: isDev
});

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    plugins: [
        new CopyPlugin([{
            from: './*.html'
          }]),
        extractScss
    ],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'eslint-loader'
        },
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["babel-preset-env"]
                }
            }
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