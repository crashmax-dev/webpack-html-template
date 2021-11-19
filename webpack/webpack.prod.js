const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { paths } = require('./webpack.config')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          to: paths.output,
          from: paths.public,
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['*.DS_Store']
          }
        }
      ]
    })
  ]
})