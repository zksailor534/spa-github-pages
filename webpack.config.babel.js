/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import pkg from './package.json';

const extractCSS = new ExtractTextPlugin('bundle.css');

export default {
  context: __dirname,
  entry: './demo/index.jsx',
  output: {
    path: `${__dirname}/gh-pages`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: extractCSS.extract('style', 'css?sourceMap'),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    extractCSS,
    new HtmlWebpackPlugin({
      template: 'lib/index_template.ejs',
      filename: 'index.html',

      // Context for the template
      title: `${pkg.name} - ${pkg.description}`,
      description: pkg.description,
    }),
    new HtmlWebpackPlugin({
      template: 'lib/404_template.ejs',
      filename: '404.html',

      // Context for the template
      title: `${pkg.name} - ${pkg.description}`,
      remote: true,
    }),
  ],
};
