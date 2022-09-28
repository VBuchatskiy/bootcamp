import externals from 'webpack-node-externals'
import nodemon from 'nodemon-webpack-plugin'
import dotenv from 'dotenv-webpack'
import { resolve } from 'path'

const paths = {
  entry: {
    root: resolve(__dirname),
    src: resolve(__dirname, 'src'),
    server: resolve(__dirname, 'src', 'server.ts')
  },
  output: resolve(__dirname, 'build')
}

export default {
  mode: 'development',
  externals: externals(),
  target: 'node',
  entry: {
    server: paths.entry.server
  },
  output: {
    filename: '[name].js',
    path: paths.output
  },
  resolve: {
    modules: [paths.entry.root, 'node_modules'],
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
    env: true
  },
  plugins: [
    new nodemon({
      env: {
        NODE_ENV: 'development',
      },
    }),
    new dotenv()
  ],
  watchOptions: {
    ignored: /node_modules/
  },
  watch: true,
}