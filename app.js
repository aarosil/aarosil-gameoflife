/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose')
mongoose = require('./app/config/db')(mongoose)
var gol = require('./app/gameOfLife')
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
app.get('/gameoflife/boards', gol.listBoards)

http.createServer(app).listen(app.get('port'), function () {
    console.log("Server listening on port " + app.get('port'));
});

