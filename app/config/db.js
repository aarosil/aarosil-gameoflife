var BoardModel = require('../models/BoardModel');

module.exports = function(mongoose) {

	//db config variables
	var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/gameoflife';
	var mongoOptions = { db: { safe: true }};

	// connect to the db
	mongoose.connect(mongoUri, mongoOptions, function () {
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
		  console.log('Database connected at @ ' + mongoUri)
		});	
	});

	BoardModel = mongoose.model('BoardModel', BoardModel);

	return mongoose;

}