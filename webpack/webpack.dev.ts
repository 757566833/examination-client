import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
export const developmentConfig :webpack.Configuration= {
  entry: {
    main: './src/index.tsx',
    // reducer:'./src/redux/reducer',
    // state:'./src/redux/state'
  },
  output: {
    // 注意这里换了一级目录
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'public/app.js',
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    // 注意这里换了一级目录
    historyApiFallback: { index: '/' },
    contentBase: '../dist',
    host: '127.0.0.1',
    hot: true,
    port: 7001,
    // 这个的作用是让webpack安静点
    stats: 'errors-warnings',
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, '..', 'dist', 'public'),
    }),
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'public/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'test',
      template: path.resolve(__dirname, 'template.dev.html'),
    }),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};
export const developmentHotConfig = {
  module: {
    rules: [{
      test: /\.(tsx|ts)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],

            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['import', { 'libraryName': 'antd', 'style': true }, 'antd'],
              [
                'babel-plugin-styled-components',
                {
                  'ssr': false,
                },
              ],
              'react-hot-loader/babel',
            ],
          },
        },
      ],
    }],
  },
};

