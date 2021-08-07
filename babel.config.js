module.exports = {
  presets: [
    ['@babel/typescript'],
    ['@babel/env', {useBuiltIns: 'usage', corejs: '3.15'}],
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-private-methods',
    ['@babel/transform-runtime', {
      corejs: 3,
      helpers: true,
      regenerator: true,
      useESModules: true
    }]
  ]
}
