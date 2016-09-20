var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen( port , 'localhost', function (err, result) {
  console.log('Listening at host: localhost and port: ' + port);
  if (err) { return console.log(err); }
});
