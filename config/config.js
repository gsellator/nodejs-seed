var env = process.env.NODE_ENV || 'dev';

var config = {
  dev: {
    port: 3200,
    bddUri: 'mongodb://localhost/app'
  },

  pre: {
    port: 3201,
    bddUri: 'mongodb://localhost/app'
  },

  prod: {
    port: 3202,
    bddUri: 'mongodb://localhost/app'
  }
};

module.exports = config[env];