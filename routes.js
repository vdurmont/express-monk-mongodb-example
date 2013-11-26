var config = require('./config.json');
var monk = require('monk');
var db = monk(config.host+'/'+config.dbname);
var collection = db.get('bugs');

// Returns all the bugs
exports.getAll = function(req, res) {
	collection.find({}, function(err, bugs){
		if (err) res.send(500, err);
		else res.json(bugs);
	});
};

// Creates a bug
exports.create = function(req, res) {
	var body = req.body;
	collection.insert(body, function(err, bug){
		if (err) res.send(500, err);
		else res.json(201, bug);
	});
};

// Get a bug
exports.get = function(req, res) {
	var id = req.params.id;
	collection.findById(id, function(err, bug){
		if (err) res.send(500, err);
		else if (bug) res.json(bug);
		else res.send(404);
	});
};

// Updates a bug
exports.update = function(req, res) {
	var id = req.params.id;
	var bug = req.body;
	delete bug._id;
	collection.updateById(id, {$set: bug}, {safe:true, multi:false}, function(err, success){
		if (err) res.send(500, err);
		else if (success == 0) res.send(404);
		else {
			bug._id = id;
			res.json(bug);
		}
	});
};

// Deletes a bug
exports.del = function(req, res) {
	var id = req.params.id;
	collection.remove({_id: id}, function(err){
		if (err) res.send(500, err);
		else res.json(204);
	});
};