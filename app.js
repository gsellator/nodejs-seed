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

// Send a mail
//var accountsFile = __dirname + '/.ftppass';
//var getMailCredentials = function(callback){
//    //Read Login & password of the gmail account sending this mail in '/.ftppass'
//    fs.readFile(accountsFile, 'utf8', function (err, data) {
//        if (err) {return;}
//        var account = {};
//        data = JSON.parse(data);
//        account.username = data.mailprod.username;
//        account.password = data.mailprod.password;
//        callback(account);
//    });
//}
//
//var createWP = function(user_id, userEmail, res){
//    model.createWelcomePack(user_id, function(resultWP){
//        console.log('Adding User : sending mail to ' + userEmail);
//        var locals = {
//            id: resultWP._id,
//            email: userEmail
//        };
//        getMailCredentials(function(account){sendWelcomeMail(account, locals);});
//        res.redirect('/home');
//    });
//}
//
//
//var sendWelcomeMail = function(account, locals){
//    var path           = require('path'),
//        templatesDir   = path.resolve(__dirname, '..', 'AdminDaily/templates'),
//        emailTemplates = require('email-templates'),
//        nodemailer     = require('nodemailer');
//
//    emailTemplates(templatesDir, function(err, template) {
//
//        if (err) {
//            console.log(err);
//        } else {
//
//            // Send a single email
//            var transport = nodemailer.createTransport("SMTP", {
//                service: "Gmail",
//                auth: {
//                    user: account.username,
//                    pass: account.password
//                }
//            });
//
//            // Send a single email
//            template('welcome', locals, function(err, html, text) {
//                if (err) {
//                    console.log(err);
//                } else {
//                    transport.sendMail({
//                        from: 'Daily d\'initiés <contact@dailydinities.fr>',
//                        to: locals.email,
//                        subject: 'Bienvenue chez Daily d\'initiés !',
//                        html: html,
//                        // generateTextFromHTML: true,
//                        text: text
//                    }, function(err, responseStatus) {
//                        if (err) {
//                            console.log(err);
//                        } else {
//                            console.log(responseStatus.message);
//                        }
//                    });
//                }
//            });
//        }
//    });
//};


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