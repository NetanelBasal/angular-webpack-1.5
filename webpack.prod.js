var config = require('./webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var zlib = require('zlib');
var isProduction = process.env.NODE_ENV === 'production' ? true : false;
var path = require('path');

config.devtool = null;
config.debug = false;
config.output.path = __dirname + '/build';
config.output.filename = "[hash].js";
config.output.publicPath = "";

config.module.loaders.push({
  test: /\.js$/,
  loader: "strip-loader?strip[]=console.log"
});

config.plugins = [

  new CleanWebpackPlugin(['./build'], {
    verbose: false
  }),

  new HtmlWebpackPlugin({
    filename: "index.html",
    metadata: {
      title: 'hotJS',
      baseUrl: '/',
      production: isProduction
    },
    template: "index.ejs",
    inject: 'body'
  }),

  new webpack.DefinePlugin({
    PRODUCTION: isProduction
  }),

  new ExtractTextPlugin("[hash].css"),

  new ngAnnotatePlugin({
    add: true
  }),

  // This plugin looks for similar chunks and files
  // and merges them for better caching by the user
  new webpack.optimize.DedupePlugin(),

  // This plugins optimizes chunks and modules by
  // how much they are used in your app
  new webpack.optimize.OccurenceOrderPlugin(),

  new UglifyJsPlugin({
    beautify: false,
    mangle: true,
    compress: {
      screw_ie8: true,
      warnings: false
    },
    comments: false

  }),

  new CompressionPlugin({
    algorithm: gzipMaxLevel,
    regExp: /\.css$|\.html$|\.js$|\.map$/,
    threshold: 2 * 1024
  }),

  new CopyWebpackPlugin([{
    from: 'app/img',
    to: 'img'
  }])
]

// Helper functions
function gzipMaxLevel(buffer, callback) {
  return zlib['gzip'](buffer, {
    level: 9
  }, callback)
}

module.exports = config;
