'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var CleanWebpackPlugin  = require('clean-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/app.ts',
        vendor: './src/vendor.ts'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    debug: true,
    devtool: 'cheap-module-source-map',
    devServer: {
        inline: true,
        historyApiFallback: true
    },

    module: {
        loaders: [
            {
                test: /\.hbs$/, loader: 'handlebars'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css?sourceMap', 'sass?sourceMap'].join('!'))
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?name=[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    resolve: {
        // ensure loader extensions match
        extensions: ['', '.ts', '.js', '.json', '.scss', '.css', '.html']
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([ { from: 'src/assets' } ]),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
        new ExtractTextPlugin('app.css'),
        new HtmlWebpackPlugin({
            title: '',
            template: './index.template.hbs',
            inject: false
        })
    ]
};