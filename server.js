/*
var app = null;
var debug = require('debug')('locomote-test:server');
var express = require('express');
var http = require('http');
var port = normalizePort(process.env.PORT || 3000);
console.log(process.env.PORT);
server = express();
server.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Server is running. Listening on ' + bind);
}

module.exports = server;
*/

/*
if (process.env.NODE_ENV === 'development') {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('./webpack.config');

    server = new WebpackDevServer(webpack(config), {
                publicPath: config.output.publicPath,
                hot: true,
                historyApiFallback: true
             });

    server.listen( 3000 , 'localhost', function (err, result) {
        if (config.prod.host === 'localhost' && config.prod.port === 3000) {
          console.log('Listening at http://localhost:3000/');
        }
        if (err) {
          return console.log(err);
        }
    });
}
if (process.env.NODE_ENV === 'production') {
    var express = require('express');
    server = express();

    module.exports = server;
}
*/

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen( config.url.port , config.url.host, function (err, result) {
  console.log('Listening at host: ' + config.url.host + ' and port: ' + config.url.port);
  if (err) { return console.log(err); }
});
