import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import tsImportPluginFactory from "ts-import-plugin";

import webpack from 'webpack';

const commonConfig: webpack.Configuration = {
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                ['@babel/plugin-proposal-class-properties', {loose: true}],
                ['import', {'libraryName': 'antd', 'style': true}, 'antd'],
                [
                  'babel-plugin-styled-components',
                  {
                    'ssr': false,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                auto: (resourcePath: string) =>
                  !resourcePath.includes('node_modules') &&
                  !resourcePath.includes('global.less'),
              },
            },
          },

        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                auto: (resourcePath: string) =>
                  !resourcePath.includes('node_modules') &&
                  !resourcePath.includes('global.less'),
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
                // modifyVars: {
                //   'primary-color': '#ff4757',
                //   'link-color': '#ff4757',
                //   'border-radius-base': '2px',
                // }
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              auto: (resourcePath: string) =>
                !resourcePath.includes('node_modules') &&
                !resourcePath.includes('global.less'),
            },
          },
        }, {
          loader: 'sass-loader',
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|woff|woff2|otf|ttf)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/',
          name: 'img/[name].[hash:7].[ext]',
        },

      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve('src'),
    },
  },

};
export default commonConfig;
