const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const publicPath = require("./webpack-helper").ASSET_PATH;
const webpack = require("webpack");

const commonConfig = {
  entry: {
    polyfills: ["whatwg-fetch"],
    app: "./src/index.js"
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.[hash].js",
    publicPath,
    sourceMapFilename: "[name].map"
  },

  resolve: {
    // Automatically resolve certain extensions. This defaults to:
    extensions: [".js", ".json"],
    // https://webpack.js.org/configuration/resolve/#resolve-modules
    modules: [path.join(__dirname, "src"), "node_modules"]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },

  plugins: [
    // Clean the dist folder
    new CleanWebpackPlugin(["dist"]),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    }),
    // Create a new index.html that refers to the bundled assets
    new HtmlWebpackPlugin({
      title: "App Boilerplate",
      template: require("html-webpack-template"),
      appMountId: "app",
      meta: [
        {
          name: "description",
          content: "App boilerplate"
        }
      ],
      lang: "en-US"
    })
  ]
};

module.exports = commonConfig;
