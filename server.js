var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen( config.prod.port , config.prod.host, function (err, result) {
  if (config.prod.host === 'localhost' && config.prod.port === 3000) {
    console.log('Listening at http://localhost:3000/');
  }
  if (err) {
    return console.log(err);
  }
});
