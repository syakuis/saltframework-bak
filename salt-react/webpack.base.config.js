/**
 * @date 2017-03-16 09:47:59
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

module.exports = (env) => {
  const { port, publicPath, proxyHost, vendors } = Object.assign({}, pkg.config, env);
  const output = pkg.config.output;
  const src = pkg.config.src;

  return {

    entry: {
      main: `./${src}/index.js`,
      vendors,
    },

    output: {
      path: path.join(__dirname, output),
      publicPath,
      filename: '[name].[hash].js',
      chunkFilename: 'chunks/[id].js',
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['commons', 'vendors'],
        minChunks: 2,
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        chunks: ['commons', 'vendors', 'main'],
        filename: 'index.html',
        template: `${src}/index.html`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          include: path.join(__dirname, src),
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=images/`,
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=fonts/`,
        },
        {
          test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000, // 10kb
            },
          },
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, src),
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-3'],
            plugins: [
              'lodash',
              'dynamic-import-webpack',
              'transform-object-assign',
            ],
          },
        },
      ],
    },
    // resolve: {
    //   alias: {

    //   }
    // },

    devServer: {
      historyApiFallback: true,
      port,
      contentBase: output,
      proxy: {
        '/api': {
          target: proxyHost,
          pathRewrite: { '^/api': '' }, // proxy path 를 제거하도록 다시 쓴다.
          secure: false,
          prependPath: true, // target 에 경로를 사용한다.
        },
      },
    },
  };
};

