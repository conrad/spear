const path = require('path')

const commonConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   loader: 'tslint-loader',
      //   options: {
      //     typeCheck: true,
      //     emitErrors: true
      //   }
      // },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
  }
}

module.exports = Object.assign(
  {
    entry: { main: './app/main.ts' }
  },
  commonConfig)

// const HtmlWebpackPlugin = require('html-webpack-plugin')
// module.exports = [
//   Object.assign(
//     {
//       target: 'electron-main',
//       entry: { main: './app/main.ts' }
//     },
//     commonConfig),
//   Object.assign(
//     {
//       target: 'electron-renderer',
//       entry: { gui: './app/gui.ts' },
//       plugins: [new HtmlWebpackPlugin()]
//     },
//     commonConfig)
// ]