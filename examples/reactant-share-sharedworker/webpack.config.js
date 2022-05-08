/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.ts',
    worker: './src/worker.ts',
    iframe: './src/iframe.ts',
    'detached-window': './src/detached-window.ts',
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
    compress: true,
    port: 7001,
    open: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
