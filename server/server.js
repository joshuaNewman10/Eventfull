var express = require('express');
var app = express();
var port = 8000;
var clearDatabase = (process.env.NODE_ENV !== 'production' && process.env.CLEAR_DATABASE === 'true')

app.set('models', require('./db/models'));

require('./middlewares/middleware')(app);
require('./routes/routes')(app);

app.use(express.static(__dirname + '/../dist/client'));

app.get('models').sequelize.sync({force: clearDatabase}).then(function () {

  // to seed the database, enter SEED=true node server/server.js;
  process.env.SEED === 'true' && require('./db/seed')(app.get('models'));

  app.set('server', app.listen(port, function () {
    process.env.NODE_ENV !== 'test' && console.log('App now listening on port: ' + app.get('server').address().port);
  }));

});

module.exports = app;