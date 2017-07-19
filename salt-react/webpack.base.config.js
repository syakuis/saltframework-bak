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
      chunkFilename: 'chunks/[name].[id].js',
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
        // 폰트를 제대로 불러오지 못함.
        // {
        //   test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/i,
        //   use: {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10000, // 10kb
        //     },
        //   },
        // },
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

    resolve: {
      alias: {
        _apps: path.resolve(__dirname, `${src}/apps`),
        _utils: path.resolve(__dirname, `${src}/utils`),
        _resources: path.resolve(__dirname, `${src}/resources`),
        _layouts: path.resolve(__dirname, `${src}/layouts`),
        _actions: path.resolve(__dirname, `${src}/actions`),
        _reducers: path.resolve(__dirname, `${src}/reducers`),
        _components: path.resolve(__dirname, `${src}/components`),
        _containers: path.resolve(__dirname, `${src}/containers`),
        _index: path.resolve(__dirname, `${src}/index`),
      },
    },

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

