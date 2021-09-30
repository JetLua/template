const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = ({ env } = {}) => {
  const prod = env === 'prod'

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: prod ? '[hash:base64]' : '[name]-[local]-[hash:base64:5]'
      },
    },
  }

  const lessLoader = {
    loader: 'less-loader',
    options: {
      lessOptions: {
        javascriptEnabled: true
      }
    }
  }

  const config = {
    cache: !prod,

    entry: ['./src/app.tsx'],

    // target: prod ? 'browserslist' : 'web',

    output: {
      path: path.resolve('dist'),
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].js',
      publicPath: '/'
    },

    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.tsx'],
      alias: {
        '@': path.resolve('.'),
        '~': path.resolve('./src'),
      }
    },

    devtool: prod ? false : 'source-map',

    stats: 'errors-only',

    module: {
      rules: [
        {
          test: /\.(tsx?|m?js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
        },
        // for custom
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: prod ?
            [MiniCssExtractPlugin.loader, cssLoader, 'postcss-loader', lessLoader] :
            ['style-loader', cssLoader, 'postcss-loader', lessLoader]
        },
        // for node_modules
        {
          test: /\.less$/,
          include: /node_modules/,
          use: prod ?
            [MiniCssExtractPlugin.loader, 'css-loader', lessLoader] :
            ['style-loader', 'css-loader', lessLoader]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: prod ? [MiniCssExtractPlugin.loader, cssLoader, 'postcss-loader'] : ['style-loader', cssLoader, 'postcss-loader']
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: prod ? [MiniCssExtractPlugin.loader, 'css-loader'] : ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpe?g|png|svg|gif)$/,
          use: ['url-loader']
        }
      ]
    },

    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom'
      }),

      new HtmlWebpackPlugin({
        hash: true,
        template: './src/layout.html',
        filename: 'index.html',
        inject: 'body',
        minify: true,
      }),

      new webpack.DefinePlugin({
        PROD: JSON.stringify(prod),
        ENV: JSON.stringify(env)
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

  // 线上环境
  if (env === 'prod' || env === 'test' || env === 'pre' || env === 'demo') {
    Object.assign(config.optimization, {
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

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash:8].css'
      })
    )
  } else { // 本地环境
    const ProgressBarPlugin = require('progress-bar-webpack-plugin')

    config.plugins.push(
      // new webpack.HotModuleReplacementPlugin(),
      new ProgressBarPlugin(),
    )

    Object.assign(config.resolve.alias, {
      'react-dom': '@hot-loader/react-dom'
    })

    config.devServer = {
      hot: true,
      host: '0.0.0.0',
      liveReload: false, // for hmr
      static: {
        directory: '.'
      },
      client: {
        logging: 'error'
      },
    }
  }

  return config
}
