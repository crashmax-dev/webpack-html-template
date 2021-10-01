const { paths } = require('./webpack.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: paths.entry,
  output: {
    path: paths.output,
    filename: 'lib.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
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
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}