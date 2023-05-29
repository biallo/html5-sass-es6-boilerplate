const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const html = {
  test: /\.html$/i,
  use: [
    {
      loader: 'html-loader',
    },
  ],
};

const js = {
  test: /\.js(x)?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
    'eslint-loader',
  ],
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: devMode,
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        'autoprefixer',
      ],
    },
    sourceMap: devMode,
  },
};

const css = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
  ],
};

const sass = {
  test: /\.s[c|a]ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
    {
      loader: 'sass-loader',
      options: {
        sourceMap: devMode,
      },
    },
  ],
};

const images = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  exclude: /fonts/,
  type: 'asset/resource',
};

const fonts = {
  test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
  exclude: /images/,
  type: 'asset/inline',
};

module.exports = [
  html,
  js,
  css,
  sass,
  images,
  fonts,
];
