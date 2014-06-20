Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
	yieldTemplates: {
		'header': {
			to: 'header'
		}
	}
});

Router.map(function() {

	this.route('home', {
		path: '/team',
		template: 'team'
	});

	this.route('team', {
		path: '/team',
		template: 'team'
	});

	this.route('result', {
		path: '/result',
		template: 'results'
	});

	this.route('vote', {
		path: '/vote/:_id',
		template: 'vote',
		data: function() {
			return Elections.findOne(this.params._id);
		}
	});

	this.route('election', {
		path: '/election',
		template: 'election'
	});

	this.route('newElection', {
		path: '/election/new',
		template: 'newElection'
	});
});
