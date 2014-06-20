Template.newElection.new = function(){
	var election = Session.get('newElection');
	if(!election){
		Session.set('newElection', {team:Session.get('team').name, alreadyVoted:[], ballot: [], closed:false, votes:[]});
	}

	return Session.get('newElection');
};

Template.newElection.events({
	'click .cancel': function(){
		Session.set('newElection', null);
		Router.go('home');
	},
	'click .save': function(){
		if(confirm("Deseja salvar e ativar essa eleição?")){
			var election = Session.get('newElection');
			if(!election.team) {
				alert('O time é obrigatório');
				return;
			}

			var date = new Date();
			date.setHours(0,0,0);
			election.date = date;
			Elections.insert(election);
			Session.set('newElection', null);
			Router.go('team');
		}
	},
	'click .add' : function(ev){
		var value = prompt('Qual a nova característica?');
		if(value){
			var election = Session.get('newElection');
			if(election.ballot.indexOf(value) === -1){
				election.ballot.push(value);
				Session.set('newElection', election);
			}
		}
	},
	'click .remove' : function(ev){
		var $this = $(ev.currentTarget);
		var value = $this.parent(".question").find(".value").text();
		var election = Session.get('newElection');
		var newBallot = election.ballot.filter(function(it){ return it != value;});
		election.ballot = newBallot;
		Session.set('newElection', election);
	}
});