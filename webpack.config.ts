import { resolve, join } from 'path';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const styledComponentsTransformer = createStyledComponentsTransformer();

const baseConfig: Configuration = {
  entry: resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: 'bundle.js',
    chunkFilename: 'vendor.bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devServer: {
    port: 8081,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, '/src/index.html'),
      minify: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeCDATASectionsFromCDATA: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        removeTagWhitespace: true,
        preventAttributesEscaping: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        caseSensitive: true,
      },
    }),
  ],
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|jpg|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          test: /node_modules/,
        },
      },
    },
  },
};

export default baseConfig;
