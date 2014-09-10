var express = require('express'),
    mongoose = require('mongoose')
model = require('./models/model'),
    auth = require('./helpers/auth');

var homeCtrl = require('./controllers/home'),
    loginCtrl = require('./controllers/login'),
    adminCtrl = require('./controllers/admin');

// Config
var bddUri = 'mongodb://localhost/amecourt';
var apiUri = 'http://127.0.0.1:3000';

mongoose.connect(bddUri, function (err, res) {
    if (err) {
        console.log ('Mongo error:' + bddUri + '. ' + err);
    } else {
        console.log ('Mongo success: ' + bddUri);
    }
});

// App Setup
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());



// EJS Helpers
//Helpers
var padStr = function(i) {
    return (i < 10) ? "0" + i : "" + i;
}

app.locals.dateToDDMMYYYY = function(dte) {
    if (dte == null)
        return "-";
    return padStr(dte.getDate()) + '/' + padStr(1 + dte.getMonth()) + '/' + padStr(dte.getFullYear());
}

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
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(3100, function(){console.log('Express server listening on port 3100');});