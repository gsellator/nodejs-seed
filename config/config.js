var env = process.env.NODE_ENV || 'dev';

var config = {
    dev: {
        port: 3000
    },

    pre: {
        port: 3001
    },

    prod: {
        port: 3002,
    }
};

module.exports = config[env];