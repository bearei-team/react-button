import * as path from 'path';
import * as webpack from 'webpack';
import webpackConfig from './webpack.config';

const config: webpack.Configuration = {
  ...webpackConfig,
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js',
    publicPath: './lib/',
    library: {type: 'commonjs2'},
  },
};

export default config;
