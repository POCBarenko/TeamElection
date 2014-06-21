Teams = new Meteor.Collection("teams");
Teams.allow({
	insert: function(userId, doc){
		return gateAllow(userId && doc.owner === userId);
	},
	update: function(userId, doc, fields, modifier){
		return gateAllow(doc.owner === userId);
	},
	remove: function(userId, doc){
		return gateAllow(doc.owner === userId);
	},
	fetch: ['owner']
});

Teams.deny({
  update: function (userId, docs, fields, modifier) {
    return gateDeny(_.contains(fields, 'owner'));
  },
  remove: function (userId, doc) {
    return gateDeny(doc.locked);
  },
  fetch: ['locked']
});



Elections = new Meteor.Collection("elections");
Elections.allow({
	insert: function(userId, doc){
		return gateAllow(userId && doc.owner === userId);
	},
	update: function(userId, doc, fields, modifier){
		return gateAllow(userId);
	},
	remove: function(userId, doc){
		return gateAllow(!doc.close && doc.owner === userId);
	},
	fetch: ['owner']
});

Elections.deny({
  update: function (userId, docs, fields, modifier) {
    return gateDeny(_.contains(fields, 'owner') ||
		_.contains(fields, 'ballot') ||
		_.contains(fields, 'alreadyVoted') ||
		_.contains(fields, 'team') ||
		_.contains(fields, 'date'));
  },
  remove: function (userId, doc) {
    return gateDeny(doc.close);
  },
  fetch: ['locked']
});

var UNSAVE_MODE = true;
function gateAllow(value){
	return UNSAVE_MODE ? true : value;
}
function gateDeny(value){
	return UNSAVE_MODE ? false : value;
}