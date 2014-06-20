Template.team.myTeams = function() {
	var team = Teams.findOne({
		members: Meteor.user().username
	});
	Session.set('team', team);
	return team;
};

Template.team.currentElection = function(user) {
	var team = Session.get('team').name;
	var election = Elections.findOne({
		closed: false,
		team: team
	});
	if(!election) return null;
	if (election.alreadyVoted.indexOf(Utils.getUsername()) === -1)
		return election;
	return null;
};

Template.team.events({
	'click button': function(ev) {
		Router.go('vote', {
			_id: $("#electionId").val()
		});
	}
});