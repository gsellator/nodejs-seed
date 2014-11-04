var config = require('./config/config'),
    express = require('express'),
    mongoose = require('mongoose');

var initializer = require('./helpers/initializer'),
    homeCtrl = require('./controllers/home'),
    loginCtrl = require('./controllers/login'),
    adminCtrl = require('./controllers/admin'),
    model = require('./models/model'),
    auth = require('./helpers/auth');

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
initializer.start(app);


// EJS Helpers
//Helpers
var padStr = function(i) {
    return (i < 10) ? "0" + i : "" + i;
};

app.locals.dateToDDMMYYYY = function(dte) {
    if (dte == null)
        return "-";
    return padStr(dte.getDate()) + '/' + padStr(1 + dte.getMonth()) + '/' + padStr(dte.getFullYear());
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

app.listen(config.port);
console.log('app running on port ' + config.port);