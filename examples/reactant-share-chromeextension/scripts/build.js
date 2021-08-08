const webpack = require('webpack');
const config = require('./webpack.config');

delete config.chromeExtensionBoilerplate;
config.mode = 'production';
webpack(
  config,
  error => { if (error) throw error; }
);
