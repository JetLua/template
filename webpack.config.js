const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = ({prod} = {}) => {
  const conf = {
    entry: ['./src/app.ts'],

    experiments: {
      topLevelAwait: true
    },

    output: {
      filename: 'game.js',
      path: path.resolve('dist')
    },

    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        '@': path.resolve('.'),
        '~': path.resolve('./src'),
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
          test: /\.ts$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.less$/,
          use: ['css-loader', 'less-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(vert|frag|txt)$/,
          use: ['raw-loader'],
          exclude: /node_modules/
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
      }),

      new webpack.ProvidePlugin({
        PIXI: 'pixi.js',
      })
    ],

    mode: prod ? 'production' : 'development',
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
  } else {
    conf.plugins.push(
      new ProgressBarPlugin()
    )
  }

  return conf
}
