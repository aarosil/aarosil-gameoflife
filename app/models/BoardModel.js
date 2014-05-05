var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = Schema({
	name	: { type: String, unique: true },
	cells	: []
})

var BoardModel = mongoose.model('BoardModel', BoardSchema);

module.exports = BoardModel;