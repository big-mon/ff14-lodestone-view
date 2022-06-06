const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  target: ["web", "es5"],

  entry: {
    contentScripts: `${__dirname}/src/js/functionOrder.js`,
  },
  output: {
    path: `${__dirname}/dist/js`,
    filename: "[name].js",
    clean: true,
  },

  module: {
    rules: [
      {
        // JSのコンパイル定義
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        // CSSのコンパイル定義
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false },
          },
        ],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "../" }],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
};
