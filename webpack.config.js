const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watchFile } = require('fs');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
  devServer: {
    watchFiles: ['./src/index.html', './src/style.css'],
    // static: './dist',
  },
  devtool: 'eval-source-map',
  /*  optimization: { 
        runtimeChunk: 'single',
    }, */
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // filename: 'index.html',
      inject: 'body',
    }),
  ],
};
