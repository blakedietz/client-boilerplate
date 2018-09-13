const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common.js");
const webpack = require("webpack");

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = Merge(CommonConfig, {
  mode: "production",
  output: {
    publicPath: ASSET_PATH
  },

  plugins: [
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ]
});
