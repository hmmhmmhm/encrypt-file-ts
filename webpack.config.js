const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './dist/index.js',
  output: {
    path: path.resolve(__dirname, 'export'),
    filename: 'encrypt-file.js',
    publicPath: './dist',
    library: 'encryptFile',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
