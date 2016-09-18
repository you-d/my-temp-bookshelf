var path = require('path');
var webpack = require('webpack');
// start the app with ">> DEBUG=true npm start" which will give a __DEV__ flag
var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__ : JSON.stringify(JSON.parse(process.env.DEBUG || false))
});

var option_1 = {
  entry: './src/index',
  devServer: {
    hot: true, inline: true, port: 3000, historyApiFallback: true
  },
  resolve: {
    extensions: [ '', '.js' ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  externals: {
    'cheerio': 'window',
    'react/lib/executionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [
      { test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0']
      }
    ]
  },
  plugins: [
    devFlagPlugin
  ],
  prod: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
  }
}

module.exports = option_1;
