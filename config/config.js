var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'myapp2'
    },
    port: 3000,
    db: 'mongodb://localhost/myapp2-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'myapp2'
    },
    port: 3000,
    db: 'mongodb://localhost/myapp2-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'myapp2'
    },
    port: 3000,
    db: 'mongodb://localhost/myapp2-production'
  }
};

module.exports = config[env];
