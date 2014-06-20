Template.vote.currentElection = function(user) {
	var team = Session.get('team').name;
	var election = Elections.findOne({
		closed: false,
		team: team
	});
	var alreadyVoted = election.alreadyVoted[Meteor.user().username];
	if (!alreadyVoted || alreadyVoted.indexOf(user) < 0)
		return election;
	return null;
};

Template.ballot.team = function() {
	return Session.get('team');
};

Template.ballot.isNotMe = function(member) {
	return Meteor.user().username != member;
};

Template.ballot.events({
	'click #cancelBallot': function(ev) {
		Router.go('home');
	},
	'click #saveBallot': function(ev) {
		try{

			var electionId = $('#electionId').val();
			var votes = [];

			$('.ballot').each(function(idx, it) {
				var $it = $(it);
				var user = $it.find(".member").text();
				var nice = $it.find(".nice").val();
				if(!nice){
					var msg = 'Faltou indicar a qualidade mais evidente de '+user;
					alert(msg);
					throw new Error('validationError: '+msg);
				}
				votes.push({
					name: user,
					type: '_nice_',
					value: nice
				});
				var bad = $it.find(".bad").val();
				if(!bad){
					var msg = 'Faltou indicar a falha mais evidente de '+user;
					alert(msg);
					throw new Error('validationError: '+msg);
				}
				votes.push({
					name: user,
					type: '_bad_',
					value: bad
				});
				$it.find(".attribute input").each(function(i, attr) {
					var $attr = $(attr);
					var attribute = $attr.attr("class");
					var value = $attr.val();
					if(!value){
						var msg = 'Faltou indicar a nota da característica '+attribute+' de '+user;
						alert(msg);
						throw new Error('validationError: '+msg);
					}
					votes.push({
						name: user,
						type: attribute,
						value: value
					});
				});
			});

			Elections.update({
				_id: electionId
			}, {
				$addToSet: {
					"alreadyVoted": Utils.getUsername(),
					"votes": {
						$each: votes
					}
				}
			});

			alert("Obrigado por votar!");
			Router.go('home');
		}catch(error){
			if(error.message.indexOf('validationError:') === -1){
				throw error;
			}
		}
	}
});