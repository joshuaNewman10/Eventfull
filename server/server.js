var express = require('express');
var app = express();
var port = 8000;
var clearDatabase = (process.env.NODE_ENV !== 'production' && process.env.CLEAR_DATABASE === 'true')

var react = require('react');
var Router = require('react-router');
var fs = require('fs');

var BUNDLE = fs.readFileSync(__dirname + '/../dist/client/build.js', {encoding: 'utf8'});
var TEMPLATE = fs.readFileSync(__dirname + '/../dist/client/index.html', {envoding: 'utf8'});

app.set('models', require('./db/models'));

require('./middlewares/middleware')(app);
require('./routes/routes')(app);

app.use(express.static(__dirname + '/../dist/client'));

app.get('*', function (req, res) { // This wildcard method handles all requests
  res.set('Content-Type', 'text/html');
  res.send(TEMPLATE);
});

app.get('models').sequelize.sync({force: clearDatabase}).then(function () {

  // to seed the database, enter SEED=true node server/server.js;
  process.env.SEED === 'true' && require('./db/seed')(app.get('models'));

  var server = app.listen(port, function () {
    process.env.NODE_ENV !== 'test' && console.log('App now listening on port: ' + server.address().port);
  });

});

module.exports = app;
