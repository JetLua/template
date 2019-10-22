const
  os = require('os'),
  path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin')


const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: [
    './src/app.js'
  ],

  output: {
    path: path.resolve('www'),
    filename: 'game.js'
  },

  resolve: {
    alias: {
      '@': path.resolve('.')
    }
  },

  devServer: {
    hot: true,
    host: '0.0.0.0',
    stats: 'errors-only',
    contentBase: '.',
  },

  devtool: isProd ? false : 'source-map',

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(vert|frag)$/,
        use: ['raw-loader']
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    }),

    new HtmlWebpackPlugin({
      hash: true,
      template: './src/layout.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ],

  mode: isProd ? 'production' : 'development'
}