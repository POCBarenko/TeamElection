function restAddress(path){
  return 'http://localhost:3000' + path;
}

App = Ember.Application.create();

App.Router.map(function(){
  this.resource('teams', function(){
    this.route('new');
  });
  this.resource('team', {path: ':team_id'});
  this.resource('elections');
  this.resource('election', {path: ':election_id'});
  this.resource('results');
  this.resource('result', {path: ':result_id'});
});

App.TeamsRoute = Ember.Route.extend({
  model: function(){
    //return Ember.$.getJSON(restAddress('/api/teams'));
    return [{
      _id: '1',
      name:"MEU_TIME",
      members:[
        {name:'user1', role:'DEV'},
        {name:'user2_PegaPraCapar@alsdef.com.br', role:'DEV'},
        {name:'user4', role:'PO'},
        {name:'user5', role:'QA'},
        {name:'user3', role:'SM'}
      ],
      currentElections: [
        {_id: '2', name:'Pesquisa de clima', iVoted:false},
        {_id: '3', name:'Pesquisa de motivação', iVoted:true}
      ]
    },{
      _id: '10',
      name:"MEU_Outro_TIME",
      members:[
        {name:'user1', role:'DEV'},
        {name:'te_conheco', role:'DEV'}
      ],
      currentElections: [
      ]
    }];
  }
});

App.TeamsNewRoute = Ember.Route.extend({
  model: function(){
    return {};
  }
});

App.ElectionsRoute = Ember.Route.extend({
  model: function(){
    //return Ember.$.getJSON(restAddress('/api/elections/active'));
    return {_id: '2', name:'Pesquisa de clima', date: Date.now(), team:'MEU_TIME', iVoted:false, alreadyVoted:['user2'], ballot: ['envolvimento','companheirismo'], closed:false, votes:[
      {name:'user1', type:'_nice_', value:'inteligente'},
      {name:'user1', type:'_nice_', value:'esperto'},
      {name:'user1', type:'_bad_', value:'introspectivo'},
      {name:'user1', type:'espírito de equipe', value:4},
      {name:'user1', type:'envolvimento', value:4},
      {name:'user2', type:'badass', value:4},
      {name:'user1', type:'companheirismo', value:2},
    ]};
  }
});

App.TeamsController = Ember.ArrayController.extend({
  showNewForm: false,
  formNewTeamValidation: {
    title: null,
    members: null
  },
  actions: {
    vote: function(){
      this.transitionToRoute('elections/new');
    },
    newToggle: function(){
      this.set('showNewForm', !this.showNewForm);
    },
    cancel: function(){
      this.set('formNewTeamValidation', {title: null, members: null});
      this.set('newTitle', null);
      this.set('newMembers', null);
      this.set('showNewForm', false);
    },
    createTeam: function(){
      var validation = {
        title: this.newTitle ? null : 'has-error',
        members: this.newMembers ? null : 'has-error'
      };

      this.set('formNewTeamValidation', validation);
      if(!this.newTitle || !this.newMembers) return;


      var newTeam = {
        name: this.newTitle,
        members: this.newMembers.split('[,;:]')
      };
      
      //TODO: enviar via rest....

      this.send('cancel');
    },
    removeTeam: function(team){
      //TODO: excluir team._id
      console.log(team);
    }
  }
});

App.TeamsNewController = Ember.ObjectController.extend({

});

/*
var logged = 'user1';
function restAddress(path){
  return 'http://localhost:3000' + path;
}

App.Team = Ember.Object.extend({
  all: function(){
    if(logged){
      return Ember.$.getJSON(restAddress('/api/teams'));
    }
  }
});

App.Router.map(function(){
  this.resource('team', {path: '/'}, function(){
    this.resource('members', {path: '/members'});
  });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function(){
    return App.Team.all();
  }
});

App.TeamRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('team');
  }
});
*/