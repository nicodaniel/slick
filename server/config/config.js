var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');
    clientPath = path.normalize(__dirname + '/../../client');

module.exports = {
  development: {
    db: 'mongodb://localhost/slackDB',
    rootPath: rootPath,
    clientPath: clientPath,
    port: process.env.PORT || 3000
  },
  production: {
     db:'mongodb://localhost/slackDB', 
    rootPath: rootPath,
    clientPath: clientPath,
    port: process.env.PORT || 80
  }
};