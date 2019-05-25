const fs = require("fs");
const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

const nodeModules = {};
fs.readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  entry: "./server/server.ts",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  target: "node",
  externals: nodeModules,
  plugins: [new NodemonPlugin()],
};
