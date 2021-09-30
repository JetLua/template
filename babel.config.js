module.exports = {
  presets: [
    ['@babel/react'],
    ['@babel/typescript', {isTSX: true, allExtensions: true, onlyRemoveTypeImports: true}],
    ['@babel/env', {useBuiltIns: 'usage', corejs: 3.17}],
  ],
  plugins: [
    ['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }],
    ['@babel/transform-runtime', {
      corejs: 3,
      helpers: true,
      regenerator: true,
      useESModules: true
    }]
  ]
}
