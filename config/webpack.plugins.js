const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

const devMode = process.env.NODE_ENV !== 'production';

let ROOT = process.env.PWD;

if (!ROOT) {
  ROOT = process.cwd();
}

const hmr = new webpack.HotModuleReplacementPlugin();

const clean = new CleanWebpackPlugin();

const stylelint = new StyleLintPlugin();

const cssExtract = new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[contenthash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
});

const cssMinimizer = new CssMinimizerPlugin();

const generateHTMLPlugins = () => glob.sync('./src/**/*.html').map((dir) => {
  const filename = path.basename(dir);

  return new HTMLWebpackPlugin({
    filename,
    template: path.join(ROOT, 'src', filename),
  });
});

const webpackBar = new WebpackBar({
  color: '#2196f3',
});

module.exports = [
  clean,
  devMode && hmr,
  stylelint,
  cssExtract,
  !devMode && cssMinimizer,
  ...generateHTMLPlugins(),
  webpackBar,
].filter(Boolean);
