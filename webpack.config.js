var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var historyApiFallback = require('connect-history-api-fallback');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var isProduction = process.env.NODE_ENV === 'production' ? true : false;
var imagePath = isProduction ? 'img/[name].[ext]?[hash]' : '../img/[name].[ext]?[hash]';

var plugins = [

  new BrowserSyncPlugin({
    host: 'localhost',
    port: 8888,
    server: {
      baseDir: ['app'],
      middleware: [historyApiFallback()]
    }
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

  new NpmInstallPlugin({
    save: true,
  }),

  new ExtractTextPlugin("dist/style.css"),

  new ngAnnotatePlugin({
    add: true
  })



]

var loaders = [

  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      presets: ['es2015']
    }
  }, {
    test: /\.html$/,
    loader: 'raw-loader'
  },

  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract("style", "css!sass!postcss-loader")
  }, {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'url-loader?limit=5000&name=' + imagePath
  }


];


module.exports = {
  entry: "./app/js/main.js",
  devtool: 'source-map',
  debug: true,
  output: {
    path: __dirname + '/app',
    filename: 'dist/[name].js',
    sourceMapFilename: 'dist/[name].map'
  },
  plugins: plugins,
  module: {
    loaders: loaders,
    resolve: {
      extensions: ['', '.js', '.es6']
    }
  },
  postcss: function() {
    return [autoprefixer];
  }
}
