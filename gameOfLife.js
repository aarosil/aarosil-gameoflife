var Board = require('./board');

exports.getNextState = function(req, res) {
	var board = new Board(req.body)
	res.send(board.getNextState())
}