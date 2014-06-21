Template.team.myTeams = function() {
	return Teams.find();
};

Template.team.currentElection = function(teamName) {
	var election = Elections.findOne({
		closed: false,
		team: teamName
	});
	if(!election) return null;
	if (!election.iVoted)
		return election;
	return null;
};

Template.team.events({
	'click button': function(ev) {
		Router.go('vote', {
			_id: $(".electionId").parent().find(".electionId").val()
		});
	}
});