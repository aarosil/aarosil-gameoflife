var mongoose = require('mongoose');
var Board = require('./board');
var BoardModel = mongoose.model('BoardModel');

exports.getNextState = function(req, res) {
	var board = new Board(req.body)
	res.send(board.getNextState())
}

exports.listBoards = function(req, res) {
	BoardModel.find({}, function(err, docs){
		res.send(docs)
	})
}