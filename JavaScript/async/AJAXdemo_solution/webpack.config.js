var path = require("path");
// var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./frontend/gifomatic.js",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js"
  }
};
