var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var env = process.env.NODE_ENV;

module.exports = {
  entry: './assets/js/common.js',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname,
    filename: "./main.js"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  postcss: function () {
    return {
      defaults: [precss, autoprefixer],
      cleaner:  [autoprefixer({ browsers: [] })]
    };
  }
};
