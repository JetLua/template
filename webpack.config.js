const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = ({prod}) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: prod ? '[hash:base64]' : '[local]_[hash:base64:6]'
      },
    }
  }

  const jsFiles = []

  const conf = {
    entry: ['./src/app.ts'],

    target: prod ? 'browserslist' : 'web',

    output: {
      path: path.resolve('dist'),
      // publicPath: prod ? cdn : '/',
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].js',
    },

    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        '@': path.resolve('.'),
        '~': path.resolve('src'),
      }
    },

    devServer: {
      host: '0.0.0.0',
      static: {
        directory: '.'
      },
      client: {
        logging: 'error'
      }
    },

    devtool: prod ? false : 'source-map',

    stats: 'errors-only',

    module: {
      rules: [
        {
          test: /\.(t|j)s$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              hotReload: !prod,
              preserveWhitespace: false
            }
          }
        },
        {
          test: /\.css$/,
          use: [prod ? MiniCssExtractPlugin.loader : 'vue-style-loader', cssLoader, 'postcss-loader']
        },
        {
          test: /\.less$/,
          use: [prod ? MiniCssExtractPlugin.loader : 'vue-style-loader', cssLoader, 'postcss-loader', 'less-loader']
        },
        {
          test: /\.txt$/,
          use: ['raw-loader']
        },
        {
          test: /\.(jpe?g|png)$/,
          type: 'asset/resource',
          dependency: {not: ['url']},
        }
      ]
    },

    plugins: [
      new VueLoaderPlugin(),

      new webpack.DefinePlugin({
        // cdn: JSON.stringify(cdn)
      }),

      new webpack.ProvidePlugin({
        PIXI: 'pixi.js',
        Router: ['vue-router'],
        Vue: ['vue/dist/vue.esm-bundler.js'],
      }),

      new HtmlWebpackPlugin({
        template: './src/layout.html',
        filename: 'index.html',
        inject: 'body',
        js: jsFiles,
        minify: {
          collapseWhitespace: true
        }
      })
    ],

    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'all',
            reuseExistingChunk: true
          },
          common: {
            name: 'common',
            priority: -1,
            chunks: 'all',
            reuseExistingChunk: true
          }
        }
      }
    },

    mode: prod ? 'production' : 'development'
  }

  if (prod) {
    Object.assign(conf.optimization, {
      minimize: true,
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserPlugin({
          parallel: 8,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false
            }
          },
        })
      ]
    })

    conf.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash:8].css'
      })
    )
  } else {
    const ProgressBarPlugin = require('progress-bar-webpack-plugin')

    conf.plugins.push(
      // new webpack.HotModuleReplacementPlugin(),
      new ProgressBarPlugin(),
    )
  }

  return conf
}
