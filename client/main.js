//  Session.set('username', 'rafaelPinto');


/*
  Template.election.currentVote = function(user){
    var team = Session.get('team').name;
    var election = Elections.findOne({closed:false, team:team});
    var alreadyVoted = election.alreadyVoted[Session.get('username')];
    if(!alreadyVoted || alreadyVoted.indexOf(user) < 0)
      return election;
    return null;
  };
  
  Template.election.notVoted = function(user){
    var username = Session.get('username');
    if(user === username) return false;
    var election = Template.election.currentVote(user);
    var alreadyVoted = election.alreadyVoted[username];
    return (!alreadyVoted || alreadyVoted.indexOf(user) < 0);
  };
*/