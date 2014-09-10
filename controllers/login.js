module.exports = {
    get: function(req, res) {
        if (req.param('error')==1) {
            // Todo : show an error message
            res.render('login.ejs');
        } else {
            res.render('login.ejs');
        }
    },

    post: function(req, res) {
        if (req.body.username == 'a' && req.body.password == 'b') {
            res.writeHead(302, {
                'Set-Cookie': 'access_token=OWgwMDo5aDAwYmlnc2VjcmV0',
                'Content-Type': 'text/plain',
                'Location': '/admin'
            });
            res.end();
        } else {
            res.redirect('/login?error=1');
        }
    }
}

