const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
const webpack = require('webpack');
const publicPath = require('./webpack-helper').ASSET_PATH;

module.exports = Merge(
  CommonConfig,
  {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'cheap-module-source-map',

    devServer: {
      port: 7777,
      host: 'localhost',
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal',
      publicPath: publicPath,
      // Serve assets from ./dist
      contentBase: './dist',
      // Enable hot module reloading
      hot: true
    }
  }
);
