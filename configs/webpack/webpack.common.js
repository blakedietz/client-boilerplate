const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const publicPath = require("./webpack-helper").ASSET_PATH;
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const releaseVersionString = process.env.RELEASE_VERSION
  ? `v${process.env.RELEASE_VERSION}`
  : '';

const commonConfig = {
  entry: {
    polyfills: ["whatwg-fetch"],
    app: "./src/index.js"
  },

  output: {
    path: path.join(process.cwd(), "dist"),
    filename: `[name].bundle.[hash].${releaseVersionString}.js`,
    publicPath,
    sourceMapFilename: "[name].map"
  },

  externals: {
    window: "window"
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
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },

  plugins: [
    // Clean the dist folder
    new CleanWebpackPlugin(["dist"]),
    // Create a new index.html that refers to the bundled assets
    new HtmlWebpackPlugin({
      title: "App Boilerplate",
      template: require("html-webpack-template"),
      appMountId: "app",
      links: [
        {
          href: "/manifest.json",
          rel: "manifest"
        }
      ],
      meta: [
        {
          name: "description",
          content: "App boilerplate",
        },
        // Adds the ability to view on mobile while keeping component dimensions
        {
          name: "viewport",
          content: "width=device-width"
        }
      ],
      lang: "en-US",
      bodyHtmlSnippet: `<noscript><img style="height: auto; width: 100%" src="http://hellofromtomorrow.com/wp-content/uploads/2016/08/HFT-headergraphic.png" alt="">Your browser doesn't support javascript</noscript>`,
      headHtmlSnippet: "<meta name=\"theme-color\" content=\"#db5945\">"
    }),
    new CopyWebpackPlugin([
      { from: 'static' }
    ]),
    new ManifestPlugin({
      /*
       Defines the properties set in a web app manifest read more about what the properties of a manifest can be:
       https://developers.google.com/web/fundamentals/web-app-manifest
       */

      seed:{
        "short_name": "Green 🍅s",
        "name": "Green Tomatoes",
        // Success: add a query string to the end of the start_url to track how often your app is launched.
        "start_url":"/?utm_source=a2hs",
        "background_color": "#3367D6",
        "display": "standalone",
        "scope": "/",
        "theme_color": "#3367D6",
        "icons": [
          {
            "src": "images/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    }),
    // new OfflinePlugin()
  ]
};

module.exports = commonConfig;
