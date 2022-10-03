import externals from 'webpack-node-externals'
import nodemon from 'nodemon-webpack-plugin'
import dotenv from 'dotenv-webpack'
import tsconfig from 'tsconfig-paths-webpack-plugin'
import { resolve } from 'path'

const paths = {
  entry: {
    root: resolve(__dirname),
    src: resolve(__dirname, 'src'),
    server: resolve(__dirname, 'src', 'server.ts')
  },
  output: resolve(__dirname, 'build')
}

const NODE_ENV = 'development'

export default {
  mode: NODE_ENV,
  externalsPresets: { node: true },
  externals: externals(),
  entry: {
    server: paths.entry.server
  },
  output: {
    filename: '[name].js',
    path: paths.output,
    publicPath: 'build',
  },
  resolve: {
    modules: [paths.entry.root, 'node_modules'],
    plugins: [new tsconfig()],
    extensions: ['js', '.ts', '.json'],
    alias: {
      '~': paths.entry.root,
      '@': paths.entry.src
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }]
      }
    ]
  },
  stats: {
    colors: true,
    env: true,
    warnings:false
  },
  plugins: [
    new nodemon({
      env: {
        NODE_ENV,
      },
    }),
    new dotenv(),
  ],
  watchOptions: {
    ignored: /node_modules/
  },
  watch: true,
}