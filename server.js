var path = require('path');
var app = require('express')();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var methodOverride = require('method-override');

var usersPortConfig = require(path.join(__dirname, '/config/port'));

var host = usersPortConfig.host;
var dev_port = usersPortConfig.port;
var dev_api_port = usersPortConfig.apiPort;
var prod_port = usersPortConfig.port;

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
/*
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
*/
app.use(require('express').static(path.join(__dirname, 'libs')));
app.use(require('express').static(path.join(__dirname, 'src')));
app.use(require('express').static(path.join(__dirname, 'dist')));
app.use(require('express').static(path.join(__dirname, 'node_modules')));

// mongodb connection string
var usersDbConfig = require(path.join(__dirname, '/config/db'));
if (app.get('env') === 'development') {
    mongoose.connect(usersDbConfig.devUrl, function(err) {
      if(err) {
          console.log('mongodb connection error for. API query URL: localhost:' + dev_api_port, err);
      } else {
          console.log('mongodb connection successful. API query URL: localhost:' + dev_api_port);
      }
    });
}
if (app.get('env') === 'production') {
    mongoose.connect(usersDbConfig.prodUrl, function(err) {
      if(err) {
          console.log('mongodb connection error. Host: ' + host + ' port ' + prod_port, err);
      } else {
          console.log('mongodb connection successful. Host: ' + host + ' port ' + prod_port);
      }
    });
}

// mapping express routes
var bookRoute = require('./src/backend/routes/book');
var libraryRoute = require('./src/backend/routes/library');
var activityRoute = require('./src/backend/routes/activity');

app.use('/book', bookRoute);
app.use('/library', libraryRoute);
app.use('/activity', activityRoute);

// in package.json, add 'NODE_ENV=development'.
if (process.env.NODE_ENV === 'development') {
    // Development environment - with webpack-dev-server
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('./webpack.config');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true
    }).listen( dev_port , 'localhost', function (err, result) {
        console.log('DEV_ENV => Listening at host: localhost and port: ' + dev_port);
        if (err) { return console.log(err); }
    });

    // open the port for the API endpoint
    app.listen(dev_api_port, function() {
        console.log('API ENDPOINT => Listening at host: ' + host + ' and port: ' +
                    dev_api_port);
    });
}
// in package.json, add 'NODE_ENV=production'.
// NOTE:
// you must run webpack first in the dev environment either with 'npm test'
// or 'npm run dev:hot' before running 'npm start'. The prod env assumes the
// dist/bundle.js has already existed.
if (process.env.NODE_ENV === 'production') {
    // Production environment - with express.js

    // mapping express routes
    var indexRoute = require('./src/backend/routes/index');
    app.use('/', indexRoute);

    app.listen(prod_port, function() {
        console.log('PROD ENV => Listening at host: ' + host + ' and port: ' + prod_port);
    });
}
