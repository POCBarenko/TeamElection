var express = require('express');
var Team = require('../models/team');

var router = express.Router();

router.route('/teams')
	.post(function(req, res){
		var team = new Team();
		team.name = req.body.name;
		team.save(function(err, time){
			if(err) res.send(err);
			res.json({message: 'Time criado!'});
		});
	})
	.get(function(req,res){
		Team.find(function(err, teams){
			if(err) res.send(err);
			res.json(teams);
		});
	});

router.route('/teams/:team_id')
	.put(function(req, res){
		Team.findById(req.params.team_id, function(err, team){
			if(err) res.send(err);
			team.name = req.body.name;
			team.members = req.body.members;

			team.save(function(err, team){
				if(err) res.send(err);
				res.json({message: 'Time atualizado!'});
			});
		});
	})
	.get(function(req,res){
		Team.findById(req.params.team_id, function(err, teams){
			if(err) res.send(err);
			res.json(teams);
		});
	})
	.delete(function(req,res){
		Team.remove({_id: req.params.team_id}, function(err, team){
			if(err) res.send(err);
			res.json({message: 'Time excluído!'});
		});
	});

module.exports = router;