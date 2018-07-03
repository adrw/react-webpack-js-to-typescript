const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: '3000',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },  {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loaders: 'awesome-typescript-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  plugins: [HTMLWebpackPluginConfig]
}