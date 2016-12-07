/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
  plugins: (() => {
    if (process.argv.indexOf('-p') !== -1) {
      return [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false,
          },
        }),
        extractCSS,
      ];
    }
    return [
      extractCSS,
    ];
  })(),
};
