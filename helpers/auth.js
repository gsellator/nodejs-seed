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
        //            req.oauth = {
        //                username: "daily",
        //                group: references.groups.autre.channels.autre.shortName,
        //                company: references.groups.autre.shortName,
        //                application: references.apps.dailyadmin.shortName,
        //                role: references.apps.dailyadmin.roles.admin.shortName
        //            };
        //            next(); return;

        var cookies = parseCookies(req);
        if ((cookies == undefined) || (cookies.access_token == undefined)) {
            res.redirect('/login');
        } else if (cookies.access_token == 'OWgwMDo5aDAwYmlnc2VjcmV0') {
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