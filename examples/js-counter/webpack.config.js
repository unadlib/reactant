/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, '../../node_modules/react'),
      reactant: path.resolve(__dirname, '../../node_modules/reactant'),
      'reactant-web': path.resolve(
        __dirname,
        '../../node_modules/reactant-web'
      ),
      'reactant-storage': path.resolve(
        __dirname,
        '../../node_modules/reactant-storage'
      ),
      'reactant-router': path.resolve(
        __dirname,
        '../../node_modules/reactant-router'
      ),
    },
  },
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 7001,
    open: true,
  },
  plugins: [
    new DefinePlugin({
      __DEV__: JSON.stringify(true),
    }),
    new NodePolyfillPlugin(),
    new CopyWebpackPlugin({
      patterns: [path.join(__dirname, './src/index.html')],
    }),
  ],
  devtool: 'source-map',
};
