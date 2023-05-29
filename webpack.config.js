const path = require('path');
const loaders = require('./config/webpack.loaders');
const plugins = require('./config/webpack.plugins');

const devMode = process.env.NODE_ENV !== 'production';
let ROOT = process.env.PWD;

if (!ROOT) {
  ROOT = process.cwd();
}

module.exports = {
  context: path.join(ROOT, 'src'),
  entry: [
    path.join(ROOT, 'src', 'javascripts/index.js'),
    path.join(ROOT, 'src', 'styles/index.scss'),
  ],
  output: {
    path: path.join(ROOT, 'dist'),
    filename: '[name].[hash].js',
  },
  mode: process.env.NODE_ENV,
  devtool: devMode ? 'eval-cheap-source-map' : 'hidden-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    host: 'localhost',
  },
  module: {
    rules: loaders,
  },
  plugins: [...plugins],
  optimization: {
  },
};
