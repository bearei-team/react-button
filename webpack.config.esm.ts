import * as path from 'path';
import * as webpack from 'webpack';
import webpackConfig from './webpack.config';

const config: webpack.Configuration = {
  ...webpackConfig,
  output: {
    path: path.resolve(__dirname, './lib-esm'),
    filename: '[name].js',
    publicPath: './lib-esm',
    library: {type: 'module'},
    environment: {
      module: true,
    },
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
};

export default config;
