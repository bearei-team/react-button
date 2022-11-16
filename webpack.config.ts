import TerserPlugin from 'terser-webpack-plugin';

import * as path from 'path';
import * as webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
    Form: path.resolve(__dirname, './src/components/Form.tsx'),
    FormItem: path.resolve(__dirname, './src/components/FormItem.tsx'),
    formInstance: path.resolve(__dirname, './src/hooks/formInstance.ts'),
    useForm: path.resolve(__dirname, './src/hooks/useForm.tsx'),
    useFormContext: path.resolve(__dirname, './src/hooks/useFormContext.tsx'),
    validate: path.resolve(__dirname, './src/utils/validate.ts'),
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js',
    publicPath: './lib/',
    libraryTarget: 'commonjs2',
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({include: /\.min\.js$/})],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: process.env.TS_NODE_PROJECT,
            },
          },
        ],
        include: path.resolve(__dirname, './src/'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  externals: {
    react: 'react',
  },
};

export default config;
