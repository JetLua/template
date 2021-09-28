module.exports = {
  presets: [
    ['@babel/typescript', {isTSX: true, allExtensions: true, onlyRemoveTypeImports: true}],
    ['@babel/env', {useBuiltIns: 'usage', corejs: 3.16}],
  ],
  plugins: [
    ['@babel/proposal-decorators', {
      legacy: true,
      // decoratorsBeforeExport: true
    }],
    '@babel/proposal-class-properties',
    ['@babel/transform-runtime', {
      corejs: 3,
      helpers: true,
      regenerator: true,
      useESModules: true
    }]
  ]
}
