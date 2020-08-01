import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import AssetsPlugin from 'assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
export const productionConfig: webpack.Configuration = {
  entry: {
    main: './src/index.tsx',
    // reducer:'./src/redux/reducer',
    // state:'./src/redux/state'
  },
  mode: 'production',
  devtool: 'source-map',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    // 改成了chunk命名，避免出现0123这种
    filename: 'public/[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, '..', 'dist', 'public'),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['public/**/*'],
    }),
    new MiniCssExtractPlugin({
      filename: 'public/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'prod',
      template: path.resolve(__dirname, 'template.prod.html'),
    }),
  ],
};


