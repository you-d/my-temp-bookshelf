var port = process.env.PORT || 3000;
var webpack = require('webpack');
var config = require('./webpack.config');

if (process.env.NODE_ENV === 'development') {
    // Development environment - with webpack-dev-server
    var WebpackDevServer = require('webpack-dev-server');

    new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      hot: true,
      historyApiFallback: true
    }).listen( port , 'localhost', function (err, result) {
      console.log('DEV_ENV => Listening at host: localhost and port: ' + port);
      if (err) { return console.log(err); }
    });
} else {
    // Production environment - with express.js
    var app = require('express')();
    var path = require('path');
    var host = process.env.HOST || 'localhost';

    app.all('*', function(req, res, next) {
        if(process.env.HOST === undefined) {
            host = req.headers.host.replace(/:\d+$/, '');
            process.env.HOST = host;
            process.env.CUSTOM_CALLBACK_URI = '//' + host + '/callback';
        }

        next('route');
    });
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname);
    app.set('view engine', 'html');
    app.use(require('express').static(path.join(__dirname, 'libs')));
    app.use(require('express').static(path.join(__dirname, 'src')));
    app.use(require('express').static(path.join(__dirname, 'dist')));
    app.use(require('express').static(path.join(__dirname, 'node_modules')));
    app.get('/', function(req, res) {
        res.render('index_prod');
    });

    app.listen(port, function() {
        console.log('PROD ENV => Listening at host: ' + host + ' and port: ' + port);
    });
}
