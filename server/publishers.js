Meteor.publish("userData", function() {
	if (this.userId) {
		return Meteor.users.find({
			_id: this.userId
		}, {
			fields: {
				'username': 1
			}
		});
	} else {
		this.ready();
	}
});

Meteor.publish('userTeams', function() {
	if (this.userId) {
		var user = Meteor.users.findOne(this.userId);
		return Teams.find({'members': user.username});
	} else {
		this.ready();
	}
});

Meteor.publish('userElections', function(){
	if(this.userId){
		var user = Meteor.users.findOne(this.userId);
		var myTeams = [];
		var user = Meteor.users.findOne(this.userId);
		Teams.find({'members': user.username}).forEach(function(t){
			myTeams.push(t.name);
		});

		var sub = this;
		var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

		db.collection('elections').aggregate(
			[
				{$match: {'team': {$in:myTeams}}},
				{$project:{team:1, date:1, ballot:1, closed:1, alreadyVotedSum: {$size:'$alreadyVoted'}, alreadyVoted: '$alreadyVoted', votes:1}},
				{$unwind:"$votes"},
				{$group: {_id:'$_id', team: {$first:'$team'}, date: {$first:'$date'}, ballot: {$first:'$ballot'}, closed: {$first:'$closed'}, alreadyVotedSum: {$first:'$alreadyVotedSum'}, alreadyVoted:{$first:'$alreadyVoted'}, votes: {$push: '$votes'}}},
				{$project:{team:1, date:1, ballot:1, closed:1, alreadyVotedSum: 1, alreadyVoted: 1, votes:1}}    
			],
			Meteor.bindEnvironment(function(err, res){
				_.each(res, function(e){
					e.iVoted = e.alreadyVoted.indexOf(user.username) >= 0;
					e.votes = e.votes.filter(function(vote){
						vote.name === user.username; 
					});
					console.log(e)

					sub.added('elections', Random.id(), e);
				});
				sub.ready();
			}, function(err){
				Meteor._debug("Error doing aggregation: "+ err);
			})
		);
	} else {
		this.ready();
	}
});