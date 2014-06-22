var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
	name:String,
	members: [String]
});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;