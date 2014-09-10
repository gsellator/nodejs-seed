var parseCookies = function(request) {
    var list = {},
        rc = request.headers.cookie;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });
    return list;
};


module.exports = {
    parseCookies: parseCookies,

    private: function(req, res, next) {
        var cookies = parseCookies(req);
        if ((cookies == undefined) || (cookies.access_token == undefined)) {
            res.redirect('/login');
        } else if (cookies.access_token == 'aaa') {
            next();
        } else {
            res.writeHead(302, {
                'Set-Cookie': 'access_token=""',
                'Content-Type': 'text/plain',
                'Location': '/login'
            });
            res.end();
        }
    }
};