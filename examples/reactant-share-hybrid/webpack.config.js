/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
    'detached-window': './src/detached-window.ts',
    iframe: './src/iframe.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
      'reactant-share': path.resolve(
        __dirname,
        '../../node_modules/reactant-share'
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
      patterns: [
        path.join(__dirname, './src/index.html'),
        path.join(__dirname, './src/detached-window.html'),
        path.join(__dirname, './src/iframe.html'),
      ],
    }),
  ],
  devtool: 'source-map',
};
