const path = require('path');
var webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const paths = {
    webroot: './wwwroot/'
};

paths.js = paths.webroot + 'js/';
paths.lib = paths.webroot + 'lib/';
paths.css = paths.webroot + 'css/';

module.exports = {
    entry: {
        'site': [paths.js + 'site.js', './Sass/site.scss'],
        'lib': [paths.js + 'vendor.js', './Sass/vendor.scss']
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '/dist/fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css'
        }),
        new CleanWebpackPlugin(
            [
                './wwwroot/dist'
            ]
        )
    ]
};