const os = require('os')
const path = require('path')
const webpack = require('webpack')
const preprocess = require('svelte-preprocess')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const prod = process.argv.includes('-p')

const conf = {
  entry: [
    './src/app.ts'
  ],

  output: {
    path: path.resolve('dist'),
    filename: 'app.js'
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
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
            hotReload: true,
            preprocess: preprocess({})
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			}
		]
  },

  plugins: [
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
