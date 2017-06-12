const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

module.exports = (env = {
  port: pkg.config.port,
  publicPath: pkg.config.publicPath,
  proxyHost: pkg.config.proxyHost,
  vendors: pkg.config.vendors,
}) => {
  const port = env.port === undefined || env.port === null || env.port === '' ? pkg.config.port : env.port;
  const publicPath = env.publicPath === undefined || env.publicPath === null || env.publicPath === '' ? pkg.config.publicPath : env.publicPath;
  const proxyHost = env.proxyHost === undefined || env.proxyHost === null || env.proxyHost === '' ? pkg.config.proxyHost : env.proxyHost;
  const vendors = env.vendors === undefined || env.vendors === null || env.vendors === '' ? pkg.config.vendors : env.vendors;

  return {

    entry: {
      main: './src/index.js',
      vendors,
    },

    output: {
      path: path.join(__dirname, 'dist'),
      publicPath,
      filename: '[name].[hash].js',
      chunkFilename: 'chunks/[id].js',
    },

    plugins: [
      new webpack.DefinePlugin({
        API_SERVER_PATH: JSON.stringify('/api'),
      }),
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
        template: 'src/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
        {
          test: /\.(png|jpg|gif|bmp|jpeg)(\?\S*)?$/i,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=images/`,
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/i,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=fonts/`,
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
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
        Components: path.resolve(__dirname, 'src/apps/components/'),
        Layouts: path.resolve(__dirname, 'src/apps/layouts/'),
        Modules: path.resolve(__dirname, 'src/apps/modules/'),
        Utils: path.resolve(__dirname, 'src/apps/utils/'),
      },
    },

    devServer: {
      historyApiFallback: true,
      port,
      contentBase: 'dist',
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

