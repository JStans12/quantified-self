const path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    index: "./lib/index.js",
    exercises: "./lib/exercises_index.js",
    foods: "./lib/foods_index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],

  resolve: {
    extensions: ['', '.js', '.json', '.css']
  }
};
