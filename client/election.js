Template.election.currentElection = function() {
	return Elections.findOne({
		closed: false
	}, {
		date: -1
	});
};

Template.election.getDate = function(dt) {
	var curr_date = dt.getDate();
	var curr_month = dt.getMonth() + 1; //Months are zero based
	var curr_year = dt.getFullYear();
	return curr_date + '/' + curr_month + '/' + curr_year;
};

Template.election.events({
	'click .finish': function(ev) {
		if (confirm('Deseja encerrar a eleição atual?')) {
			Elections.update({
				_id: $(ev.currentTarget.parentElement).find('#electionId').val()
			}, {
				$set: {
					closed: true
				}
			});
		}
	},
	'click .create': function(ev) {
		Router.go('newElection');
	}
});