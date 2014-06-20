Template.results.myResults = function(){
	return Elections.find({closed:true, team: Session.get('team').name},{date:-1});
};

Template.summary.summarize = function(election){
	var summary = election.votes
		.filter(function(it){return it.name === Meteor.user().username;})
		.reduce(function(sum, curr){
			if(curr.type === '_nice_' || curr.type === '_bad_'){
				var arr = sum[curr.type] || [];
				arr.push(curr.value);
				sum[curr.type] = arr;
			} else {
				var total = sum[curr.type + '#SUM'] || 0;
				var subSum = sum[curr.type] || 0;
				total = total + 1;
				subSum = subSum + curr.value;
				sum[curr.type + '#SUM'] = total;
				sum[curr.type] = subSum;
			}
			return sum;
		}, {});

		for(var k in summary){
			if(k.indexOf("#SUM") > -1){
				var radical = k.split("#")[0];
				summary[radical] = summary[radical] / summary[k];
				delete summary[k];
			}
		}

		var arr = [];
		for(var i in summary){
			arr.push({attr:i, value:summary[i]});
		}
		return arr;
};