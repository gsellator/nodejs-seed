var pjson = require('./package.json'),
    config = require('./config/config'),
    bddUri = config.bddUri,
    initializer = require('./helpers/initializer');

var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express(),
    server = app.listen(config.port);

mongoose.connect(bddUri, function (err, res) {
  if (err) {console.log ('Mongo error:' + bddUri + '. ' + err);} 
  else {console.log ('Mongo success: ' + bddUri);}
});

// App Setup
var env = process.env.NODE_ENV || 'dev';
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
initializer.start(app);

// EJS Helpers
//Helpers
var padStr = function(i) {
  return (i < 10) ? "0" + i : "" + i;
};

// Routes
app.get('/', function(req, res) {
  res.writeHead(301, {Location: '/home'});
  res.end();
});
app.get('/home', homeCtrl.get);

app.get('/admin', auth.private, adminCtrl.get);

app.get('/login', loginCtrl.get);

app.post('/login', loginCtrl.post);

app.get('/logout', function(req, res) {
  res.writeHead(302, {
    'Set-Cookie': 'access_token=""',
    'Content-Type': 'text/plain',
    'Location': '/'
  });
  res.end();
});

app.use(function(req, res, next){
  res.redirect('/');
});

console.log('app running on port ' + config.port);