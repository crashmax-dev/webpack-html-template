const path = require('path')
const webpack = require('webpack')
const outputPath = path.resolve(__dirname, 'dist')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    path: outputPath,
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  devServer: {
    open: true,
    https: true,
    port: 8080,
    writeToDisk: true,
    contentBase: outputPath
  },
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true
                  }
                }
              ]
            ]
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: outputPath
        }
      ]
    })
  ]
}