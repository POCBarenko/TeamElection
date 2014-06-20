Meteor.startup(function () {
  console.log('starting...');
  console.log(Teams.find().count());
  if(Teams.find().count() === 0){
    console.log('adding fixture teams');
    var prev = Teams.findOne();
    if(prev) Teams.remove(prev._id);
    Teams.insert({_id: '1', name:"MEU_TIME", members:['user1', 'user2', 'user3']});
  }

  if(Elections.find().count() === 0){
    console.log('adding fixture elections');
    var prev = Elections.findOne();
    if(prev) Elections.remove(prev._id);
    var date = new Date();
    date.setHours(0,0,0);
    Elections.insert({_id: '2', date: date, team:'SEM', alreadyVoted:['user2'], ballot: ['envolvimento','companheirismo'], closed:false, votes:[
      {name:'user1', type:'_nice_', value:'inteligente'},
      {name:'user1', type:'_nice_', value:'esperto'},
      {name:'user1', type:'_bad_', value:'introspectivo'},
      {name:'user1', type:'espírito de equipe', value:4},
      {name:'user1', type:'envolvimento', value:4},
      {name:'user1', type:'companheirismo', value:2},
    ]});
  }
});
