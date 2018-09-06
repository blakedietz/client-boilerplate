const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common");
const publicPath = require("./webpack-helper").ASSET_PATH;
const webpack = require("webpack");
const fs = require("fs");

module.exports = Merge(CommonConfig, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    https: {
      key: fs.readFileSync(require.resolve("./dev-server/localhost.key")),
      cert: fs.readFileSync(require.resolve("./dev-server/localhost.crt"))
    },
    port: 8888,
    host: "localhost",
    historyApiFallback: true,
    noInfo: false,
    stats: "minimal",
    publicPath: publicPath,
    // Serve assets from ./dist
    contentBase: "./dist",
    // Enable hot module reloading
    hot: true,
    open: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
