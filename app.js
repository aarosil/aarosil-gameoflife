/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var gol = require('./gameOfLife')
var app = express();

/**
 * Configurations.
 */
// all environments
app.set('port', process.env.PORT || 3001);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, './public')));
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/gameoflife/getnextstate', gol.getNextState)

http.createServer(app).listen(app.get('port'), function () {
    console.log("Server listening on port " + app.get('port'));
});

