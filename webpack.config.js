const os = require('os')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const prod = process.argv.includes('-p')

const conf = {
  entry: [
    './src/app.js'
  ],

  output: {
    path: path.resolve('dist'),
    filename: 'game.js'
  },

  resolve: {
    alias: {
      '@': path.resolve('.'),
      '~': path.resolve('./src')
    }
  },

  devServer: {
    hot: true,
    host: '0.0.0.0',
    stats: 'errors-only',
    contentBase: '.',
  },

  devtool: prod ? false : 'source-map',

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
      PIXI: 'pixi.js',
      dragonBones: 'dragonbones.js'
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

  mode: prod ? 'production' : 'development'
}

if (prod) {
  conf.optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    },

    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false
          }
        },
      })
    ]
  }
}

module.exports = conf