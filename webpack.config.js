const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pkg = require('./package.json')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'popup': './popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },/*
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }*/
    ]
  },
  resolve: {
    alias: {
      'vue.js': 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    //noInfo: true,
    overlay: true
  },
  performance: {
    //hints: false
  },
  devtool: 'source-map',
  plugins: [
    /*
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    */
    new CopyWebpackPlugin([
      { from: './content-script.js' },
      { from: './**/*.css' },
      { from: './**/*.html' },
      { from: './**/*.svg' },
      { from: './**/*.png' },
      { from: './manifest.json' },
    ])
  ]
};
