var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var uglifyJs = require('uglify-es');
var fs = require('fs');

var routeAPI = require('./app_server/routes/index');

var app = express();

var client_public_files = [
  'app_client/main.js',
  'app_client/components/home.controller.js',
  'app_client/components/addLocation.controller.js',
  'app_client/components/locationDetail.controller.js',
  'app_client/components/location_types/locationType.controller.js',
  'app_client/components/common/navigation.directive.js',
  'app_client/components/common/myfooter.directive.js',
  'app_client/components/common/ratingStars.directive.js',
  'app_client/components/common/navigation.controller.js',
  'app_client/components/auth/login.controller.js',
  'app_client/components/auth/register.controller.js',
  'app_client/services/authentication.service.js',
  'app_client/components/userInfo.controller.js'
];
var filesContent = client_public_files.map((file) => {
  return fs.readFileSync(file, 'utf8');
});
var uglified = uglifyJs.minify(filesContent);
fs.writeFile('app_client/public/locator_app.min.js', uglified.code, (err) => {
  if (err) console.log("minify", err);
  else console.log('Generated and saved: locator_app.min.js');
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'app_client', 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_client', 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use('/api', routeAPI);

app.use(function(req, res) {
	res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
